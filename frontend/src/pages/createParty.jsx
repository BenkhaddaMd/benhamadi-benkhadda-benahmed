import React, {useEffect, useState} from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/input";
import Textarea from "../components/ui/Textarea";
import Switch from "../components/ui/Switch";
import { Label } from "../components/ui/label";
import { createParty, updateParty, deleteParty } from "../api/party";

export default function CreatePartyPage() {
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        availablePlaces: 1,
        isPaid: false,
        price: 0,
        description: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
    });
    const [organizerId, setOrganizerId] = useState(1);
    const [partyId, setPartyId] = useState(null);
    const [message, setMessage] = useState("");

    const convertDate = (dateString) => {
        const [year, month, day] = dateString.split("-"); // Sépare jour, mois, année
        return `${year}-${month}-${day}`; // Formate en yyyy-m-d
    };

    useEffect(() => {
        setOrganizerId(JSON.parse(localStorage.getItem('userData')).id);
    }, []);

    const handleChange = (e) => {
        const { id, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "number" ? parseFloat(value) : value,
        }));
    };

    const handleSwitchChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            isPaid: value,
        }));
    };

    const formatDateTime = () => {
        // Combine la date et l'heure en format LocalDateTime (ISO 8601)
        if (formData.date && formData.time) {
            return `${formData.date}T${formData.time}`;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const requestData = {
            dateTime: formatDateTime(),
            availablePlaces: formData.availablePlaces,
            isPaid: formData.isPaid,
            price: formData.isPaid ? formData.price : 0, // Pas de prix si non payant
            description: formData.description,
            street: formData.street,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
        };

        if (!partyId) {
            const response = await createParty(organizerId, requestData);
            if (response.success) {
                setMessage(response.message);
                setPartyId(response.data.id);
            } else {
                setMessage(response.message);
            }
        } else {
            const response = await updateParty(partyId, requestData);
            setMessage(response.message);
        }
    };

    const handleDelete = async () => {
        if (!partyId) {
            alert("Aucune soirée sélectionnée pour suppression");
            return;
        }

        const response = await deleteParty(partyId);
        setMessage(response.message);
        if (response.success) {
            setFormData({
                date: "",
                time: "",
                availablePlaces: 1,
                isPaid: false,
                price: 0,
                description: "",
                street: "",
                city: "",
                postalCode: "",
                country: "",
            });
            setPartyId(null);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Créer une soirée</h1>
            {message && <p className="text-center text-lg text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="time">Heure</Label>
                    <Input id="time" type="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="availablePlaces">Nombre de places disponibles</Label>
                    <Input
                        id="availablePlaces"
                        type="number"
                        min="1"
                        value={formData.availablePlaces}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="isPaid" checked={formData.isPaid} onCheckedChange={handleSwitchChange} />
                    <Label htmlFor="isPaid">Soirée payante</Label>
                </div>
                {formData.isPaid && (
                    <div>
                        <Label htmlFor="price">Prix</Label>
                        <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Entrez le prix en euros"
                            required={formData.isPaid}
                        />
                    </div>
                )}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Décrivez votre soirée"
                    />
                </div>
                <div>
                    <Label htmlFor="street">Rue</Label>
                    <Input
                        id="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Entrez la rue"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="city">Ville</Label>
                    <Input
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Entrez la ville"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="Entrez le code postal"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="country">Pays</Label>
                    <Input
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Entrez le pays"
                        required
                    />
                </div>
                <Button type="submit">{partyId ? "Modifier la soirée" : "Créer la soirée"}</Button>
                {partyId && <Button type="button" onClick={handleDelete}>Supprimer la soirée</Button>}
            </form>
        </div>
    );
}
