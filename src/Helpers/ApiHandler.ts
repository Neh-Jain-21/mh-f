import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";

type UserDataType = {
	accessToken?: string;
	userInfo?: { type: string };
};

type ApiResponseType = {
	/** DATA RESPONDED FROM API */
	data?: any;

	/** MESSAGE RESPONDED FROM API */
	message: string;
};

interface ICustomRequest extends AxiosRequestConfig {
	/** FOR SENDING FILES OR FORM DATA REQUEST */
	isMultipart?: boolean;

	/** IF USER ID AND TOKEN SHOULDN'T BE PASSED IN HEADERS */
	skipAuth?: boolean;
}

const METHOD = { GET: "get", POST: "post", PUT: "put", DELETE: "delete" };

class Api {
	private loggedIn: boolean = false;
	private userData: UserDataType = {};
	private baseURL: string | undefined = "";

	constructor() {
		this.baseURL = process.env.REACT_APP_API_URL;
		this.getAuthenticationInfo();
	}

	private getAuthenticationInfo() {
		if (localStorage.getItem("loggedIn")) {
			this.loggedIn = true;

			const user_data = localStorage.getItem("user_data");
			if (user_data) {
				this.userData = JSON.parse(user_data);
			}
		}
	}

	/*
	 * MAKE TYPESCRIPT TO HANDLE ERROR
	 */
	isApiError = (error: any): error is AxiosError<ApiResponseType> => {
		if (error.response) return true;
		else return false;
	};

	/*
	 * GET REQUEST
	 */
	get(url: string, data?: ICustomRequest): Promise<AxiosResponse<ApiResponseType>> {
		return new Promise((resolve, reject) => {
			this.api(METHOD.GET, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error: AxiosError<ApiResponseType>) => {
					reject(error);
				});
		});
	}

	/*
	 * POST REQUEST
	 */
	post(url: string, data?: ICustomRequest): Promise<AxiosResponse<ApiResponseType>> {
		return new Promise((resolve, reject) => {
			this.api(METHOD.POST, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error: AxiosError<ApiResponseType>) => {
					reject(error);
				});
		});
	}

	/*
	 * PUT REQUEST
	 */
	put(url: string, data?: ICustomRequest): Promise<AxiosResponse<ApiResponseType>> {
		return new Promise((resolve, reject) => {
			this.api(METHOD.PUT, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error: AxiosError<ApiResponseType>) => {
					reject(error);
				});
		});
	}

	/*
	 * DELETE REQUEST
	 */
	delete(url: string, data?: ICustomRequest): Promise<AxiosResponse<ApiResponseType>> {
		return new Promise((resolve, reject) => {
			this.api(METHOD.DELETE, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error: AxiosError<ApiResponseType>) => {
					reject(error);
				});
		});
	}

	private api(method: string, url: string, data?: ICustomRequest): Promise<AxiosResponse<ApiResponseType>> {
		return new Promise((resolve, reject) => {
			const axiosConfig: AxiosRequestConfig = {};

			axiosConfig.method = method;
			axiosConfig.url = this.baseURL + url;
			axiosConfig.headers = this.setHeaders(data);

			if (data) {
				if (data.params) axiosConfig.params = data.params;
				if (data.data) axiosConfig.data = data.data;
			}

			axios(axiosConfig)
				.then((response) => {
					resolve(response);
				})
				.catch((error: AxiosError<ApiResponseType>) => {
					if (error.response?.status === 500) {
						// LOGOUT HERE
					}

					reject(error);
				});
		});
	}

	private setHeaders(data?: ICustomRequest) {
		const headers: AxiosRequestHeaders = {};

		headers["accept-language"] = "en";
		headers["Content-Type"] = "application/json";
		headers["Bypass-Tunnel-Reminder"] = "any"; // REMOVE IF NOT LOCALTUNNEL

		if (data) {
			if (data.isMultipart) {
				headers["Content-Type"] = "multipart/form-data";
			}

			if (data.headers) {
				for (var key in data.headers) {
					if (data.headers.hasOwnProperty(key)) {
						headers[key] = data.headers[key];
					}
				}
			}
		}

		if (this.loggedIn && !(data && data.skipAuth)) {
			if (this.userData.accessToken) {
				headers["authorization"] = this.userData.accessToken;
			}
			if (this.userData.userInfo?.type) {
				headers["admin_type"] = this.userData.userInfo.type;
			}
		}

		return headers;
	}
}

export default Api;
