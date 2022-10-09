export interface MinioConfig {
  minioHost: string;
  minioPort: number;
  minioKey: string;
  minioSecret: string;
}

export interface UploadConfig {
  documentsUrl: (id: string) => string;
  deleteDocumentsUrl: (id: string, name: string) => string;
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
    minioHost: isProd
      ? process.env.MINIO_PROD_HOST
      : process.env.MINIO_DEV_HOST,
    minioPort: Number(
      isProd ? process.env.MINIO_PROD_PORT : process.env.MINIO_DEV_PORT
    ),
    minioKey: process.env.MINIO_ROOT_USER,
    minioSecret: process.env.MINIO_ROOT_PASSWORD,
  },
  upload: {
    documentsUrl: (id) => `/api/documents/upload/?id=${id}`,
    deleteDocumentsUrl: (id, name) =>
      `/api/documents/delete/?id=${id}&name=${name}`,
  },
};
