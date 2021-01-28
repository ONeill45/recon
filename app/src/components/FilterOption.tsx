import { useState } from 'react'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'

type filterOptionProps = {
  title: string
}

export const FilterOption = ({ title }: filterOptionProps) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <div
        style={{
          height: '40px',
          border: '1px solid black',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <AiOutlineDown /> : <AiOutlineRight />} {title}
      </div>
      <div>
        {expanded ? (
          <div
            style={{
              border: '1px solid black',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* this is just an example and will be replaced later */}
            <div>
              <input type="checkbox" id="checkbox1" />
              <label htmlFor="checkbox1">Relevant filter option 1</label>
            </div>
            <div>
              <input type="checkbox" id="checkbox2" />
              <label htmlFor="checkbox2">Relevant filter option 2</label>
            </div>
            <div>
              <input type="checkbox" id="checkbox3" />
              <label htmlFor="checkbox3">Relevant filter option 3</label>
            </div>
            <div>
              <input type="checkbox" id="checkbox4" />
              <label htmlFor="checkbox4">Relevant filter option 4</label>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
