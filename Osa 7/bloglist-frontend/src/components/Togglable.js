import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Card } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey='0'>
          {props.buttonLabel}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            {props.children}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
