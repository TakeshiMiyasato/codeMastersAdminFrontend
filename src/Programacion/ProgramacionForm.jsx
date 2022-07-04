import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const ProgramacionForm = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [nombreEjercicio, setNombreEjercicio] = useState('')
    const [ejercicio, setEjercicio] = useState('')
    const [puntaje, setPuntaje] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else if (id !== undefined) {
            fetchProgramacion(id)
        }
    }, [id])

    const fetchProgramacion = () => {
        axios.get(`http://127.0.0.1:8000/api/programaciones/${id}`, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('getProgramacion res', res.data)
            setNombreEjercicio(res.data.nombreEjercicio)
            setEjercicio(res.data.ejercicio)
            setPuntaje(res.data.puntaje)
        }).catch((err) => {
            console.log('Error en getProgramacion: ', err)
        })
    }

    const guardarProgramacion = () => {
        const formData = {
            nombreEjercicio,
            ejercicio,
            puntaje
        }

        if(id === undefined){
            axios.post(`http://127.0.0.1:8000/api/programaciones/`, formData, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('postAgregarDocumentacion', res.data)
                navigate('/')
            }).catch((err) =>{
                console.log('Error al postAgregarDocumentacion', err)
            })
        } else {
            axios.patch(`http://127.0.0.1:8000/api/programaciones/${id}/`, formData, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('patchDocumentacion', res.data)
                navigate('/programaciones')
            }).catch((err) =>{
                console.log('Error al patchDocumentacion', err)
            })
        }
    }

    return (
        <Container>
            <h2>{nombreEjercicio}</h2>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Label style={{fontWeight:'bold'}}>Nombre del ejercicio</Form.Label>
                        <Form.Control value={nombreEjercicio} onChange={(e) => setNombreEjercicio(e.target.value)}/>
                        <Form.Label style={{fontWeight:'bold'}}>Descripcion del ejercicio</Form.Label>
                        <Form.Control value={ejercicio} onChange={(e) => setEjercicio(e.target.value)}/>
                        <Form.Label style={{fontWeight:'bold'}}>Puntaje</Form.Label>
                        <Form.Control value={puntaje} onChange={(e) => setPuntaje(e.target.value)}/>
                        <Button style={{marginTop: '10px'}} variant='success' onClick={() => guardarProgramacion()}>Guardar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProgramacionForm;