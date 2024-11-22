import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/Button";
import Header from "../components/layout/header";
import { signup } from "../api/auth";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        dateOfBirth: "",
        interests: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const [message, setMessage] = useState(""); // Message de feedback
    const [success, setSuccess] = useState(false); // Indicateur de succès

    const convertDate = (dateString) => {
        const [year, month, day] = dateString.split("-"); // Sépare jour, mois, année
        return `${year}-${month}-${day}`; // Formate en yyyy-m-d
    };


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({
            ...formData,
            dateOfBirth: convertDate(formData.dateOfBirth),
        });
        
        try {
            const response = await signup({
                ...formData,
                dateOfBirth: convertDate(formData.dateOfBirth),
            });
            if (response.success) {
                setMessage("Inscription réussie !");
                setSuccess(true);
            } else {
                setMessage(response.message);
                setSuccess(false);
            }
        } catch (error) {
            setMessage("Une erreur est survenue lors de l'inscription.");
            setSuccess(false);
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-2xl font-bold">Inscription</h1>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <Label htmlFor="username">Nom</Label>
                    <Input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Label htmlFor="dateOfBirth">Date de naissance</Label>
                    <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                    <Label htmlFor="interests">Centre d'intérêt</Label>
                    <Input
                        id="interests"
                        type="text"
                        value={formData.interests}
                        onChange={handleChange}
                    />
                    <Label htmlFor="street">Rue</Label>
                    <Input
                        id="street"
                        type="text"
                        value={formData.street}
                        onChange={handleChange}
                        required
                    />
                    <Label htmlFor="city">Ville</Label>
                    <Input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input
                        id="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                    />
                    <Label htmlFor="country">Pays</Label>
                    <Input
                        id="country"
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" className="mt-4">
                        S'inscrire
                    </Button>
                </form>
                {message && (
                    <div
                        className={`mt-4 p-2 rounded ${
                            success ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </>
    );
}
