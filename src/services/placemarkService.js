import axios from "axios";
import {push} from "svelte-spa-router";
import { loggedin, isAdmin, currentUserName} from "./stores.js"


export class PlacemarkService {
    baseUrl = "";

    loggedIn = false;

    username = "";


    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        const credentials = localStorage.WAHI
        if (credentials) {
            const savedUser = JSON.parse(credentials)
            loggedin.set(true);
            this.username = savedUser.username;
            currentUserName.set(savedUser.username);
            if (savedUser.role === "admin") {
                isAdmin.set(true);
            }
            else {
                isAdmin.set(false);
            }
            axios.defaults.headers.common.Authorization = `Bearer ${  savedUser.token}`;
        }
    }

    async getbaseUrl() {
        return this.baseUrl;
    }

    async getUserInfo(){
        try {
            const response = await axios.get(`${this.baseUrl  }/api/getUserbyUsername/${  this.username}`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async create(name, description, category, lng, lat) {
        let res = {
            status : "",
            message : ""
        }
        try {
            const placemark = {
                name : name,
                description : description,
                category : category,
                location : {
                    type: "Point",
                    coordinates: [
                        lng,
                        lat
                    ],
                },
                creationuser: this.username
            };
            const created = await axios.post(`${this.baseUrl  }/api/addPlacemark`, placemark);
            console.log(created)
            res = { status : "success", message : "Placemark added", newid: created.data._id };
            return res;
        } catch (error) {
            if (error.response.status === 400) {
                res = { status : "exists", message : "Placemark already exists"};
            }
            else {
                res = { status : "error", message : "Something went wrong"};
            }
            return res

            }
    }

    async updateMail(mail){
        try {
            const payload = {
                username : this.username,
                email : mail
            }
            const response = await axios.post(`${this.baseUrl  }/api/changeMail`, payload);
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async addPhoto(id, image){
        try {
            const photo = {
                id : id,
                image : image
            };
            await axios.post(`${this.baseUrl  }/api/addPhoto`, photo);
            return true;
        } catch (error) {
            return false;
        }
    }

    async deletePOI(id){
        try {
            await axios.delete(`${this.baseUrl  }/api/deletePlacemark/${  id}`);
            return true;
        } catch (error) {
            return false;
        }
    }

    async deleteUser(id) {
        try {
            await axios.delete(`${this.baseUrl  }/api/deleteUser/${  id}`);
            return true;
        } catch (error) {
            return false;
        }
    }

    async promoteUser(id) {
        try {
            await axios.post(`${this.baseUrl  }/api/promoteToAdmin/${  id}`);
            // console.log(response)
            return true;
        }
        catch (error) {
            return false;
        }
    }

    async getAllUsers(){
        try {
            const response = await axios.get(`${this.baseUrl  }/api/getUsers`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async getPois(){
        try {
            // api/getPlacemarks
            const response = await axios.get(`${this.baseUrl  }/api/getPlacemarks`);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getPoi(id){
        try {
            console.log(this.baseUrl)
            const response = await axios.get(`${this.baseUrl  }/api/getPlacemarkbyID/${  id}`);
            // console.log(response)
            return response.data;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }

    async getRatingStats(){
        try {
            const response = await axios.get(`${this.baseUrl  }/api/getRatingStats`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async getUserStats(){
        try {
            const response = await axios.get(`${this.baseUrl  }/api/getPlacemarkUserStats`);
            console.log("userstats received")
            return response.data;
        } catch (error) {
            return null;
        }
    }


    async getCategoryStats(){
        try {
            const response = await axios.get(`${this.baseUrl  }/api/getPlacemarkStats`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async addImage(id, formdata){
        try {
            await axios.post(`${this.baseUrl  }/api/addImage/${  id}` , formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            /*
             old version for one photo only
            let success = await axios.post(this.baseUrl + "/api/uploadimage/" + id , formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

             */
            return true;

        } catch (error) {
            console.log(error)
            return null;
        }

    }

    async giveRating(id, rating){
        try {
            const response = await axios.post(`${this.baseUrl  }/api/addRating`, {id, rating});
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async giveComment(id, comment, username){
        try {
            const response = await axios.post(`${this.baseUrl  }/api/giveComment`, {id, comment, username});
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
            axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
            console.log(response)
            if (response.data.success) {
                loggedin.set(true);
                this.username = response.data.username;
                console.log("LOGGED IN!")
                console.log(response.data)
                currentUserName.set(response.data.username);

                if (response.data.role === "admin") {
                    isAdmin.set(true);
                }
                else {
                    isAdmin.set(false);
                }
                localStorage.WAHI = JSON.stringify({username: response.data.username, role: response.data.role ,token:response.data.token});

                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async logout() {
        axios.defaults.headers.common.Authorization = "";
        loggedin.set(false);
        isAdmin.set(false);
        currentUserName.set(null);
        localStorage.removeItem("WAHI");
        await push("#/")
        console.log("LOGGED OUT!")
    }

    async wakeUpServer(){
        await axios.get(`${this.baseUrl}/api/test`);
    }

    async signup(firstName, lastName, username, email, password) {
        let res;
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
            };
            await axios.post(`${this.baseUrl  }/api/addUser`, userDetails);
            // console.log("User created!");
            res = { status : "success", message : "User created!"};
            return res;
        } catch (error) {
            if (error.response.status === 400) {
                res = { status : "exists", message : "User already exists"};
            }
            else {
                res = { status : "error", message : "Signup failed"};
            }
            return res
        }
    }
}
export  const placemarkService = new PlacemarkService("https://wahi-backend.herokuapp.com");