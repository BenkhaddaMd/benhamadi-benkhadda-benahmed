import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import FindParty from './pages/FindParty';
import Login from './pages/login';
import Signup from "./pages/signup";
import CreatePartyPage from "./pages/createParty";
import ProfilePage from "./pages/auth/profile";
import PartyList from "./pages/listPartys";
import PartyDetailsPage from "./pages/partyDetails";
import PartyParticipation from "./pages/partyParticipate";
function App() {
    return (
        <div className="App">
            <Router>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<FindParty />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/createParty" element={<CreatePartyPage />} />
                    <Route path="/auth/profile" element={<ProfilePage />} />
                    <Route path="/listPartys" element={<PartyList />} />
                    <Route path="/party/:id" element={<PartyDetailsPage />} />
                    <Route path="/participate/:partyId" element={<PartyParticipation />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
