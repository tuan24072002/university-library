"use client"
import React, { useRef, useState } from 'react'
import {
    IKImage,
    ImageKitProvider,
    IKUpload,
} from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
const {
    env: {
        imagekit: { publicKey, urlEndpoint },
    },
} = config;

const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
        if (!response.ok) {
            const errorText = await response.text();

            throw new Error(
                `Request failed with status ${response.status}: ${errorText}`,
            )
        }
        const data = await response.json();
        const { signature, expire, token } = data;
        return { token, expire, signature };
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};
const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
    const IKUploadRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<{ filePath: string } | null>(null);
    const onError = (error: any) => {
        console.log(error);
        toast({
            title: 'Image Upload Failed',
            description: 'Your image could not be uploaded. Please try again.',
            variant: 'destructive',
        })
    };
    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath);

        toast({
            title: 'Image Upload Successfully',
            description: `${res.filePath} uploaded successfully!`,
        })
    };
    return (
        <ImageKitProvider
            publicKey={publicKey}
            authenticator={authenticator}
            urlEndpoint={urlEndpoint}>
            <IKUpload
                className='hidden'
                ref={IKUploadRef}
                onError={onError}
                onSuccess={onSuccess}
                fileName='test-upload.png'
            />

            <button className='upload-btn form-input' onClick={(e) => {
                e.preventDefault();
                if (IKUploadRef.current) {
                    IKUploadRef.current.click();
                }
            }}>
                <Image
                    src='/icons/upload.svg'
                    alt='upload'
                    width={20}
                    height={20}
                    className='object-contain' />

                <p className='text-base text-light-100'>Upload a File</p>
                {
                    file && <p className='upload-filename'>
                        {file.filePath}
                    </p>
                }
            </button>

            {
                file &&
                <IKImage
                    alt={file.filePath}
                    path={file.filePath}
                    width={500}
                    height={300}
                    className='hover:scale-105 transition-all duration-300'
                />
            }
        </ImageKitProvider>
    )
}

export default ImageUpload