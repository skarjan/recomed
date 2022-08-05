import axios from 'axios';

const baseUrl = "https://api.nytimes.com/svc/books/v3"
const listUrl = "/lists/names.json"

// a complete call using currentListUrl uses: 
//"/lists/current/hardcover-fiction.json"
const currentListUrl = "/lists/current/"
const apiKey = "?api-key=h0I1KL1zf4VzVx5uckeiJKbiC46tci17"

const getList = ()=>{
   const request = axios.get(`${baseUrl}${listUrl}${apiKey}`);
    return request.then(response=>{

      return response.data.results
    })
}

const getCurrentList = (subject)=> {
    const request = axios.get(`${baseUrl}${currentListUrl}${subject}.json${apiKey}`);
    return request.then(response=>{
      return response.data
    })
}

export default {getList, getCurrentList}