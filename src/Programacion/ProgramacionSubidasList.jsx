import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const ProgramacionSubidasList = () => {

    const { id } = useParams()

    const [subidas, setSubidas] = useState([])
    const [nombreEjercicio, setNombreEjercicio] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        } else if (id === undefined) {
            navigate('/')
        } else {
            fetchProgramacionSubidas()
        }
    }, [])

    const fetchProgramacionSubidas = () => {
        const params = {
            'idProgramacion': id
        }
        axios.post('http://127.0.0.1:8000/api/programacionHechaPorJugador/getSubidasByEjercicio/', params, {
            headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllDocumentacion res', res.data)
            setSubidas(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllDocumentacion: ', err)
        })
        axios.get(`http://127.0.0.1:8000/api/programaciones/${id}`, {
            headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllDocumentacion res', res.data)
            setNombreEjercicio(res.data.nombreEjercicio)
        }).catch((err) => {
            console.log('error al llamar getAllDocumentacion: ', err)
        })
    }

    return (
        <Container>
            <h2>{nombreEjercicio}</h2>
            <Card>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Subida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subidas.map(subida =>
                                <tr key={"subida-" + subida.id}>
                                    <td><h4><Link to={`/programacionSubida/${subida.id}`}>Pendiente</Link></h4></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProgramacionSubidasList;