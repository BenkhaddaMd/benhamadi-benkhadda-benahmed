import axios from "axios";

const base_url = "http://localhost:8080/api/";

export const participate = async (userId, eventId, status = "pending") => {
    try {
        const response = await axios.post(`${base_url}participate`, {
            userId,
            eventId,
            status,
        });

        return {
            success: true,
            message: "Participation enregistrée avec succès",
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Une erreur est survenue",
        };
    }
};
