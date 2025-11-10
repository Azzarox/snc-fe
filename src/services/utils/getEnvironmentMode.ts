export const getEnvironmentMode = () => {
	return import.meta.env.MODE;
};

export const isDev = import.meta.env.DEV;

export const isProd = import.meta.env.PROD;
