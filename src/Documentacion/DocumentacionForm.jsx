import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Card, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const DocumentacionForm = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const [nombreLeccion, setNombreLeccion] = useState('')
    const [documentacion, setDocumentacion] = useState('')
    const [preguntaQuizz, setPreguntaQuizz] = useState('')
    const [resCorrecta, setResCorrecta] = useState('')
    const [resIncorrecta1, setResIncorrecta1] = useState('')
    const [resIncorrecta2, setResIncorrecta2] = useState('')
    const [resIncorrecta3, setResIncorrecta3] = useState('')
    const [puntaje, setPuntaje] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else if (id !== undefined) {
            fetchDocumento(id)
        }
    }, [id])

    const fetchDocumento = () => {
        axios.get(`http://127.0.0.1:8000/api/documentaciones/${id}`, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('getSingleDocumento res', res.data)
            setNombreLeccion(res.data.nombreLeccion)
            setDocumentacion(res.data.documentacion)
            setPreguntaQuizz(res.data.preguntaQuizz)
            setResCorrecta(res.data.respuestaCorrecta)
            setResIncorrecta1(res.data.respuestaIncorrecta1)
            setResIncorrecta2(res.data.respuestaIncorrecta2)
            setResIncorrecta3(res.data.respuestaIncorrecta3)
            setPuntaje(res.data.puntaje)

        }).catch((err) => {
            console.log('Error en getDocumento: ', err)
        })
    }

    const guardarDocumentacion = () => {
        const formData = new FormData()
        formData.append('nombreLeccion', nombreLeccion)
        formData.append('documentacion', documentacion)
        formData.append('preguntaQuizz', preguntaQuizz)
        formData.append('respuestaCorrecta', resCorrecta)
        formData.append('respuestaIncorrecta1', resIncorrecta1)
        formData.append('respuestaIncorrecta2', resIncorrecta2)
        formData.append('respuestaIncorrecta3', resIncorrecta3)
        formData.append('puntaje', puntaje)

        if(id === undefined){
            axios.post(`http://127.0.0.1:8000/api/documentaciones/`, formData, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('postAgregarDocumentacion', res.data)
                navigate('/documentaciones')
            }).catch((err) =>{
                console.log('Error al postAgregarDocumentacion', err)
            })
        } else {
            axios.patch(`http://127.0.0.1:8000/api/documentaciones/${id}/`, formData, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('patchDocumentacion', res.data)
                navigate('/documentaciones')
            }).catch((err) =>{
                console.log('Error al patchDocumentacion', err)
            })
        }
    }


    return ( 
        <Container>
            <h2>{nombreLeccion}</h2>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Label style={{fontWeight: 'bold'}}>Nombre de la leccion</Form.Label>
                        <Form.Control onChange={(e) => setNombreLeccion(e.target.value)} value={nombreLeccion}/>
                        <Form.Label style={{fontWeight: 'bold'}}>Documentacion HTML</Form.Label>
                        <Form.Control as={'textarea'} rows={15} onChange={(e) => setDocumentacion(e.target.value)} value={documentacion}/>
                        <Form.Label style={{fontWeight: 'bold'}}>Pregunta del Quizz</Form.Label>
                        <Form.Control onChange={(e) => setPreguntaQuizz(e.target.value)} value={preguntaQuizz}/>
                        <Form.Label style={{fontWeight: 'bold'}}>Respuesta correcta</Form.Label>
                        <Form.Control onChange={(e) => setResCorrecta(e.target.value)} value={resCorrecta}/>
                        <Form.Label style={{fontWeight: 'bold'}}>Respuesta incorrecta 1</Form.Label>
                        <Form.Control onChange={(e) => setResIncorrecta1(e.target.value)} value={resIncorrecta1}/>
                        <Form.Label style={{fontWeight: 'bold'}}>Respuesta incorrecta 2</Form.Label>
                        <Form.Control onChange={(e) => setResIncorrecta2(e.target.value)} value={resIncorrecta2}/>
                        <Form.Label style={{fontWeight: 'bold'}}>Respuesta incorrecta 3</Form.Label>
                        <Form.Control onChange={(e) => setResIncorrecta3(e.target.value)} value={resIncorrecta3}/>
                        <Form.Label style={{fontWeight: 'bold'}}>Puntaje</Form.Label>
                        <Form.Control onChange={(e) => setPuntaje(e.target.value)} value={puntaje}/>
                        <Button style={{marginTop: '10px'}} variant='success' onClick={() => guardarDocumentacion()}>Guardar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DocumentacionForm;