import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/Button";
import Header from "../components/layout/header";
import { participate } from "../api/participe";

export default function PartyParticipation() {
    const [formData, setFormData] = useState({
        userId: "",
        eventId: "",
        status: "pending",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await participate(
                formData.userId,
                formData.eventId,
                formData.status
            );
            if (response.success) {
                setSuccessMessage(response.message);
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage("Une erreur est survenue lors de la soumission.");
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-12" style={{ maxWidth: "600px" }}>
                <h1 className="text-2xl font-bold mb-6">Participation à la Soirée</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Label htmlFor="userId">ID Utilisateur *</Label>
                    <Input
                        id="userId"
                        type="number"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />

                    <Label htmlFor="eventId">ID Événement *</Label>
                    <Input
                        id="eventId"
                        type="number"
                        value={formData.eventId}
                        onChange={handleChange}
                        required
                    />

                    <Label htmlFor="status">Statut *</Label>
                    <Input
                        id="status"
                        type="text"
                        value={formData.status}
                        onChange={handleChange}
                    />

                    {successMessage && (
                        <p className="text-green-600">{successMessage}</p>
                    )}
                    {errorMessage && (
                        <p className="text-red-600">{errorMessage}</p>
                    )}

                    <Button type="submit">Confirmer la participation</Button>
                </form>
            </div>
        </>
    );
}
