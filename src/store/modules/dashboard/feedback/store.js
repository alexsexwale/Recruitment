import axios from "./node_modules/axios";

export default {
    mutations: {
        feedback: (state, payload) => {
            if(payload.subject && payload.message) {
                payload.type = "feedback";
                axios.post(`http://localhost:5000/joboxza/us-central1/app/notifications`, {
                    body: payload
                });
            }
        }
    },
    actions: {
        feedback: (context, payload) => {
            context.commit("feedback", payload);
        }
    }
};