import { useState, useEffect, useCallback, useMemo } from "react";

export default function MyComp() {
    const [date, setDate] = useState(new Date());
    const [inputNum, setInputNum] =useState(0);
    const [ number, setNumber] = useState([1]);

    // 현재시간 실행하는 함수
    const tick = () => {
        setDate(new Date());
    }
    
    useEffect( () => {
        return () => {
            setInterval(()=> {
                return tick()
            }, 1000) 
        }
    }, [ date ]);

    // 입력값 입력시 setInputNum 업뎃, 최초 렌더링시에만 다음 함수 실행
    const onChange = useCallback( e => {
        setInputNum(e.target.value);
    }, [])
    
    // 버튼 클릭시 넘버 배열에 입력값 추가
    // 입력값(number) 변화 시에만 다음 함수 실행
    const addNum = useCallback( () => {
        setNumber([
            ...number,
            parseInt(inputNum)
        ]);
        setInputNum(0);
    }, [inputNum, number]); 

    // 입력값들의(number 배열)의 합
    const sumNum = (list)=> {
        return list.reduce( (prev, curr) => prev + curr );
    };
    // 평균 구하기
    const avrgNum = useMemo( ()=> sumNum(number)/number.length, [number]);

    return (
        <div>
            <h1>{ date.toLocaleTimeString() } </h1>

            <input type="number" value={ inputNum } onChange={ onChange } ></input>
            <button onClick={ () => addNum() }>추가</button>
            <h3>모든 수의 평균 : { avrgNum } </h3>
            <ul>
                { number.map( (n, i) => ( <li key={i}> {n} </li> ) )}
            </ul>
        </div>
    )
}