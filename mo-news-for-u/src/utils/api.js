import axios from "axios"

const request = axios.create({ baseURL: "https://mo-news-for-u.herokuapp.com/api" });

export const getTopics = async () => {
    const { data } = await request.get("/topics");
    return data;
}

export const getArticles = async () => {
    const { data } = await request.get("/articles");
    return data
}

export const getArticle = async (id) => {
    const { data } = await request.get(`/articles/${id}`);
    return data;
}

export const articleVoter = async (id, inc_votes) => {
    const { data } = await request.patch(`/articles/${id}`, { inc_votes });
    return data;
}

export const getComments = async (id) => {
    const { data } = await request.get(`/articles/${id}/comments`);
    return data;
}

export const commentVoter = async (id, inc_votes) => {
    const { data } = await request.patch(`/comments/${id}`, { inc_votes });
    return data;
}