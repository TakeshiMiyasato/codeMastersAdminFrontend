import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Container, Card, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const ProgramacionSubida = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const [codigo, setCodigo] = useState('')
    const [userName, setUserName] = useState('')
    const [correcto, setCorrecto] = useState(false)

    const [usuarioId, setUsuarioId] = useState(0)
    const [puntaje, setPuntaje] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else if (id === undefined) {
            navigate('/')
        } else {
            fetchProgramacionSubida()
        }
    }, [])

    const fetchProgramacionSubida = () => {
        axios.get(`http://127.0.0.1:8000/api/programacionHechaPorJugador/${id}`,
            { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log(res.data)
                setCodigo(res.data.codigo)
                setUserName(res.data.user_name)
                setUsuarioId(res.data.usuarioId)
                axios.get(`http://127.0.0.1:8000/api/programaciones/${res.data.programacionId}`,
                    { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } }).then((res) => {
                        console.log(res.data)
                        setPuntaje(res.data.puntaje)
                    }).catch((err) => {
                        console.log('error al obtener subida', err)
                    })
            }).catch((err) => {
                console.log('error al obtener subida', err)
            })

    }

    const revisar = () => {
        const params = {
            'revisado': true,
            correcto
        }
        axios.patch(`http://127.0.0.1:8000/api/programacionHechaPorJugador/${id}/`, params,
            { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log(res.data)
                if (correcto === 'true') {
                    const params2 = {
                        'idJugador': usuarioId,
                        'puntosAAsignar': puntaje
                    }
                    axios.post(`http://127.0.0.1:8000/api/puntosPorJugadores/leveling/`, params2, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                        console.log('Respondido', res)
                        localStorage.setItem('puntajeAnual', res.data.puntajeAnual)
                        localStorage.setItem('puntajeTotal', res.data.puntajeTotal)
                        localStorage.setItem('nivel', res.data.nivel)
                        navigate('/')
                    }).catch((err) => {
                        console.log('Error al post esteUsuarioHaRespondido', err)
                    })
                }
                navigate('/programaciones')
            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <Container>
            <p>Codigo subido por {userName}</p>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Label style={{ fontWeight: 'bold' }}>Codigo</Form.Label>
                        <Form.Control readOnly as={'textarea'} value={codigo} />
                    </Form>
                    <ButtonGroup style={{ marginTop: '15px' }}>
                        <ToggleButton
                            key={0}
                            id={0}
                            type="radio"
                            name="radio"
                            variant={'outline-danger'}
                            value={false}
                            checked={correcto === 'false'}
                            onChange={(e) =>
                                setCorrecto(e.currentTarget.value)
                            }>
                            Incorrecto
                        </ToggleButton>
                        <ToggleButton
                            key={1}
                            id={1}
                            type="radio"
                            name="radio"
                            variant={'outline-success'}
                            value={true}
                            checked={correcto === 'true'}
                            onChange={(e) =>
                                setCorrecto(e.currentTarget.value)
                            }>
                            Correcto
                        </ToggleButton>
                    </ButtonGroup>
                    <div><Button style={{ marginTop: '15px' }} onClick={() => revisar()}>Revisar</Button></div>

                </Card.Body>
            </Card>
        </Container>
    );
}


export default ProgramacionSubida;