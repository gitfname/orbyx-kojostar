
import { addComment } from "./addComment";

addComment({
    content: "test-comment-1",
    job_id: 22,
    rate: "3.8"
})
.then(data => {
    console.log("got Data");
    console.log(data);
})
.catch(err => {
    console.log("got Errro");
    
    console.log(err);
})