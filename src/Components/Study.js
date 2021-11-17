import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Study(){
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();
    const [cards, setCards] = useState([]);
    const [front, setFront] = useState(true);
    const history = useHistory();
    const [currentCardNumber, setCurrentCardNumber] = useState(1)

    useEffect(() => {
        async function loadDeck(){
            const abortController = new AbortController();
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response)
            setCards(response.cards)
            return() => {
                abortController.abort()
            }
        }
        loadDeck();
    }, [deckId])

function nextCard(index, total){
if (index < total) {
    setCurrentCardNumber(currentCardNumber + 1);
    setFront(true)
} else {
    if (
        window.confirm(
            `Restart cards? Click 'cancel' to return to the home page`
        )
    ) {
        setCurrentCardNumber(1)
        setFront(true)
    } else{
        history.push("/") 
    }
}
}

function flip() {
    front ? setFront(false) : setFront(true)
}

function moreCardsNeeded(){
    return (<div>
        <h2>Not enough cards.</h2>
        <p> You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
        <Link to = {`/decks/${deck.id}/cards/new`} className = "btn btn-primary mx-1"> Add Cards</Link>
    </div>)
}

function next(cards, index){
    if (front) {
        return null;
    } else {
        return (
            <button
                onClick={() => nextCard(index + 1, cards.length)}
                className="btn btn-primary mx-1"
            >
                Next
            </button>
        );
    }
}
function cardRequirementMet(){
    return (
        <div className="card">
            {cards.map((card, index) => {
                if (index === currentCardNumber - 1) {
                    return (
                        <div className="card-body" key={card.id}>
                            <div className="card-title">
                                {`Card ${index + 1} of ${cards.length}`}
                            </div>
                            <div className="card-text">
                                {front ? card.front : card.back}
                            </div>
                            <button
                                onClick={flip}
                                className="btn btn-secondary mx-1"
                            >
                                Flip
                            </button>
                            {next(cards, index)}
                        </div>
                    );
                }
            })}
        </div>
    );
}
    return (
        <div>
            <ol className = "breadcrumb">
                <li className = "breadcrumb-item">
                    <Link to = "/"> Home </Link>
                    </li>
                    <li className = "breadcrumb-item">
                        <Link to = {`/decks/${deckId}`}> {deck.name} </Link>
                    </li>
                    <li className = "breadcrumb-item active"> Study </li>
            </ol>
            <div>
            <h2>{`Study: ${deck.name}`}</h2>
            <div>
             {cards.length === 0 
             ? moreCardsNeeded()
             : cards.length > 2 
             ? cardRequirementMet()
             : moreCardsNeeded()
            }
            </div>
            </div>
        </div>
    )
}

export default Study