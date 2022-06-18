import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

type UserDataType = {
	accessToken?: string;
	userInfo?: { type: string };
};

interface ICustomRequest extends AxiosRequestConfig {
	/** FOR SENDING FILES OR FORM DATA REQUEST */
	isMultipart?: boolean;

	/** IF USER ID AND TOKEN SHOULDN'T BE PASSED IN HEADERS */
	skipAuth?: boolean;
}

const METHOD = { GET: "get", POST: "post", PUT: "put", DELETE: "delete" };

class Api {
	loggedIn: boolean = false;
	userData: UserDataType = {};
	baseURL: string | undefined = "";

	constructor() {
		this.baseURL = process.env.REACT_APP_BASE_URL;
		this.getAuthenticationInfo();
	}

	getAuthenticationInfo() {
		if (localStorage.getItem("loggedIn")) {
			this.loggedIn = true;

			const user_data = localStorage.getItem("user_data");
			if (user_data) {
				this.userData = JSON.parse(user_data);
			}
		}
	}

	get(url: string, data: ICustomRequest) {
		return new Promise((resolve, reject) => {
			this.api(METHOD.GET, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}

	post(url: string, data: ICustomRequest) {
		return new Promise((resolve, reject) => {
			this.api(METHOD.POST, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}

	put(url: string, data: ICustomRequest) {
		return new Promise((resolve, reject) => {
			this.api(METHOD.PUT, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}

	delete(url: string, data: ICustomRequest) {
		return new Promise((resolve, reject) => {
			this.api(METHOD.DELETE, url, data)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}

	api(method: string, url: string, data: ICustomRequest) {
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
					if (response.data && response.data.status === 500) {
						// Notification Here
					} else {
						resolve(response.data);
					}
				})
				.catch((error) => {
					console.log("ERROR", error);
				});
		});
	}

	setHeaders(data: ICustomRequest) {
		const headers: AxiosRequestHeaders = {};

		headers["accept-language"] = "en";
		headers["Content-Type"] = "application/json";

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
