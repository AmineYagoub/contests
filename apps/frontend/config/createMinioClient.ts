import * as Minio from 'minio';

import { config } from './';

let minioClient: Minio.Client;

export function createMinioClient() {
  return new Minio.Client({
    endPoint: config.minio.minioHost,
    port: config.minio.minioPort,
    useSSL: config.isProduction,
    accessKey: config.minio.minioKey,
    secretKey: config.minio.minioSecret,
  });
}

export function initializeMinio() {
  const _minioClient = minioClient ?? createMinioClient();
  if (config.isServer) return _minioClient;
  if (!minioClient) minioClient = _minioClient;
  return _minioClient;
}

export const createBucket = (name: string): Promise<string> => {
  const minioClient = initializeMinio();
  return new Promise((resolve, reject) => {
    minioClient.bucketExists(name, (err: Error, exists: boolean) => {
      if (err) {
        return reject(err);
      }
      if (!exists) {
        minioClient.makeBucket(name, '', (e: Error) => {
          if (e) {
            return reject(e);
          }
          resolve(name);
        });
      } else {
        resolve(name);
      }
    });
  });
};

export const uploadFile = (bucket: string, file: string, name: string) => {
  const minioClient = initializeMinio();
  return new Promise<boolean>((resolve, reject) => {
    minioClient.fPutObject(bucket, name, file, (e: Error) => {
      if (e) {
        return reject(e);
      }
      resolve(true);
    });
  });
};

export const getUrl = (
  bucket: string,
  file: string,
  days: number
): Promise<string> => {
  const minioClient = initializeMinio();
  return new Promise((resolve, reject) => {
    minioClient.presignedGetObject(
      bucket,
      file,
      days * (24 * 60 * 60),
      (err: Error, presignedUrl: string) => {
        if (err) return reject(err);
        resolve(presignedUrl);
      }
    );
  });
};

export const deleteFile = (
  bucket: string,
  objectName: string
): Promise<boolean> => {
  const minioClient = initializeMinio();
  return new Promise((resolve, reject) => {
    minioClient.removeObject(bucket, objectName, (err: Error) => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};
