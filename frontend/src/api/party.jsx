import axios from "axios";

const base_url = "http://localhost:8080/api/parties";

export const createParty = async (organizerId, partyData) => {
    const token = localStorage.getItem('authToken');
    console.log(partyData)
    try {
        const response = await axios.post(`${base_url}/${organizerId}`, partyData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: "Soirée créée avec succès",
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Une erreur est survenue",
        };
    }
};

export const updateParty = async (id, partyData) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.put(`${base_url}/${id}`, partyData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            message: "Soirée modifiée avec succès",
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Une erreur est survenue",
        };
    }
};

export const deleteParty = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
        await axios.delete(`${base_url}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            success: true,
            message: "Soirée supprimée avec succès",
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Une erreur est survenue",
        };
    }
};
