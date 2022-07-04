import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Container, Card, ButtonGroup } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const Menu = () => {

    const navigate = useNavigate()

    const toDocumentacion = () => {
        navigate('/documentaciones')
    }

    const toProgramacion = () => {
        navigate('/programaciones')
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <ButtonGroup className="d-grid gap-2" size='lg'>
                        <Button variant='dark' onClick={toProgramacion}>Programacion</Button>
                        <Button variant='success' onClick={toDocumentacion}>Documentacion</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Menu;