import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

// Components
import Pokemon from '../components/Pokemon';
import Loader from '../components/Loader';

var len = 1;
var len1 = 20;
const Homepage = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState("");


    const onInputChange = (e) =>{
            setInput(e.target.value);
        };

//    const onInputChange = useCallback(
//     ev => {
//         setInput(ev.target.value);
//     }, [setInput]
//    )
//    const onSearch = async () => {
//     const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`);
//     return res;
//    }
//    const onKeyDown = ev => {
//     if(ev.keyCode === 13){
//         onSearch();
//     }
//    }

    async function changeloopPrev() {
        if(len > 1){
            len = len - 20;
            len1 = len1 - 20;
            let pokemonArray = [];
            for(let i = len; i <= len1; i ++){
                pokemonArray.push(await getPokemonData(i));
            }
            setPokemon(pokemonArray);
            setLoading(false);
        }
    }
    async function changeloopNext() {
        len = len + 20;
        len1 = len1 + 20;
        let pokemonArray = [];
        for(let i = len; i <= len1; i ++){
            pokemonArray.push(await getPokemonData(i));
        }
        setPokemon(pokemonArray);
        setLoading(false);
    }

    const getPokemonList = async () => {
        let pokemonArray = [];
        for(let i = len; i <= len1; i ++){
            pokemonArray.push(await getPokemonData(i));
        }
        setPokemon(pokemonArray);
        setLoading(false);
    }

    

    const getPokemonData = async (id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
    }

    useEffect(() => {
        getPokemonList();
    }, [])

    return (
        <>
        <div style={{margin: 'auto',margin : '20px'}}>
            <input style={{padding: '10px', width:'500px'}} type="text" placeholder='Search pokemon'
             onChange={onInputChange}  value= {input} />
        </div>
        {loading ? (
            <Loader/>
        ) : (   
            <Row>
                {pokemon.map( p =>(
                    <Col key={p.data.name} xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Pokemon pokemon={p.data}/>
                    </Col>
                ))}
            </Row>
        )}
        <div className='d-flex justify-content-around mb-3'>
            {len > 2 &&
            <button onClick={changeloopPrev} style={{border:'none', background:'#ffffff',boxShadow:'1px 1px 1px 1px darkblue', padding:'8px', borderRadius: '5px'}}>Previous</button>
            }
            <button onClick={changeloopNext} style={{border:'none',background:'#ffffff',boxShadow:'1px 1px 1px 1px darkblue', padding:'8px', borderRadius: '5px'}}>Next</button>
        </div>
        </>
    )
}

export default Homepage
