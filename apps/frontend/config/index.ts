export interface MinioConfig {
  minioHost: string;
  minioKey: string;
  minioSecret: string;
  minioSSL: boolean;
}

export interface UploadConfig {
  documentsUrl: (id: string) => string;
  deleteDocumentsUrl: (id: string, name: string) => string;
  uploadAllowedExt: string[];
  uploadAllowedMimeType: string[];
  uploadMaxSize: number;
}

export interface AppConfig {
  jwtName: string;
  refreshJwtName: string;
  nonceName: string;
  isProduction: boolean;
  isServer: boolean;
  minio: MinioConfig;
  upload: UploadConfig;
}
const isProd = process.env.NODE_ENV !== 'development';
export const config: AppConfig = {
  isProduction: isProd,
  isServer: typeof window === 'undefined',
  jwtName: 'aoc_jwt',
  refreshJwtName: 'aoc_jwt_ref',
  nonceName: isProd ? '__Host_Fgp_nonce' : 'fgp_nonce',
  minio: {
    minioHost: process.env.MINIO_HOST,
    minioSSL: process.env.MINIO_USE_SSL === '1',
    minioKey: process.env.MINIO_ROOT_USER,
    minioSecret: process.env.MINIO_ROOT_PASSWORD,
  },
  upload: {
    documentsUrl: (id) => `/api/documents/upload/?id=${id}`,
    deleteDocumentsUrl: (id, name) =>
      `/api/documents/delete/?id=${id}&name=${name}`,
    uploadAllowedExt: ['png', 'jpj', 'jpeg', 'webp'],
    uploadAllowedMimeType: ['image/jpeg', 'image/png', 'image/webp'],
    uploadMaxSize: 5,
  },
};
