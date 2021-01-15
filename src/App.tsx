import React, {useState, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import { writeText } from 'clipboard-polyfill'


function Input(p: any) {
  return <textarea {...p}/>
}


export const useClipboard = (value: any, cb: any) =>
  useCallback(
    (event) => {
      event?.stopPropagation()

      writeText(value)

      cb && typeof cb === 'function' && cb(true)
    },
    [value]
  )

function App() {
  const [inputA, setInputA] = useState('грузоперевозки, сборныйгруз, логистика')
  const [inputB, setInputB] = useState('тольятти, липецк')

  const [isCopyied, setIsCopyied] = useState(false)

  // @ts-expect-error
  const handleChange = cb => e => cb(e.target.value)

  const result = [
    ...inputA.split(/,?\s+/).map(b => '#' + b),
    ...inputB.split(/,?\s+/).map(b => '#' + b),
    ...inputA.split(/,?\s+/).flatMap(a => inputB.split(/,?\s+/).map(b => '#' + a + b))
  ]

  const handleClick = useClipboard(result, () => {
    setIsCopyied(true)

    setTimeout(() => setIsCopyied(false), 2000)
  })

  return (
    <div className='App'>
      <h2>#hashtags</h2>
      <Input as='textarea' rows={3} variant='outline' value={inputA} onChange={handleChange(setInputA)} />
      <Input as='textarea' rows={3} variant='outline' value={inputB} onChange={handleChange(setInputB)} />

      <Input as='textarea' rows={10} value={result.join(' ')} variant='outline'/>

      <button onClick={handleClick}>{!isCopyied ? 'Скопировать' : 'Скопировано'}</button>
    </div>
  )
}

export default App;
