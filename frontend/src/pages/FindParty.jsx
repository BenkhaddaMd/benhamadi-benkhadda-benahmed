import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/ui/card";
import Search from "../components/ui/search";
import { useNavigate } from "react-router-dom";

export default function SearchParties() {
    const allParties = [
        {
            id: 1,
            name: "Soirée Monopoly",
            type: "Jeux de société",
            location: "Paris",
            date: "2024-11-25",
            description: "Une soirée conviviale autour du Monopoly et d'autres jeux.",
        },
        {
            id: 2,
            name: "LAN Party",
            type: "Jeux vidéo",
            location: "Lyon",
            date: "2024-12-10",
            description: "Une LAN party avec vos jeux préférés.",
        },
        {
            id: 3,
            name: "Soirée dansante",
            type: "Classique",
            location: "Marseille",
            date: "2024-11-30",
            description: "Dansez toute la nuit dans une ambiance festive.",
        },
    ];

    const [filteredParties, setFilteredParties] = useState(allParties);
    const navigate = useNavigate(); // Hook pour la navigation

    const handleSearch = (term) => {
        const lowerTerm = term.toLowerCase();
        const results = allParties.filter((party) =>
            party.name.toLowerCase().includes(lowerTerm) ||
            party.location.toLowerCase().includes(lowerTerm) ||
            party.type.toLowerCase().includes(lowerTerm)
        );
        setFilteredParties(results);
    };

    const handleParticipate = (partyId) => {
        navigate(`/participate/${partyId}`); // Redirige vers la page de participation
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Rechercher une soirée</h1>
            <div className="mb-8">
                <Search onSearch={handleSearch} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredParties.length > 0 ? (
                    filteredParties.map((party) => (
                        <Card key={party.id}>
                            <CardHeader>
                                <CardTitle>{party.name}</CardTitle>
                                <CardDescription>{party.type}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <strong>Lieu :</strong> {party.location}
                                </p>
                                <p>
                                    <strong>Date :</strong> {party.date}
                                </p>
                                <p className="mt-2 text-gray-600">{party.description}</p>
                                <button
                                    onClick={() => handleParticipate(party.id)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Participer
                                </button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center col-span-3 text-gray-500">Aucune soirée trouvée.</p>
                )}
            </div>
        </div>
    );
}
