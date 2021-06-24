import {Container, Form, FormGroup, FormControl, FormLabel, Alert, Button, Col, Row, Card} from 'react-bootstrap';
import {useState} from 'react';
import GithubCorner from 'react-github-corner';

export default function Home() {
  const [steps, setSteps] = useState([]);
  const [cmd, setCmd] = useState();

  const addStep = () => {
    let step = document.getElementById('tempStep').value;
    let newSteps = [...steps];
    newSteps.push(step);
    document.getElementById('tempStep').value = '';
    setSteps(newSteps);
  };

  const generateCommand = (event) =>{
    event.preventDefault();
    let cmd = `!submit -t ${document.getElementById('title').value} -r ${steps.join(' - ')} -e ${document.getElementById('expected').value} -a ${document.getElementById('actual').value} -c ${document.getElementById('client').value} -s ${document.getElementById('system').value}`;
    setCmd(<Alert variant={'success'}>Use the following command in the relevant client reporting channel in Discord Testers:<br/><b>{cmd}</b></Alert>);
  }

  let stepElements = [];
  for(let i = 0; i < steps.length; i++) {
    stepElements.push(<li key={i}>{steps[i]}</li>);
  }

  return (
    <Container fluid={true} className={'text-white bg-dark d-flex justify-content-center'} style={{height: '100vh'}}>
      <GithubCorner href={'https://github.com/PermissionError/discord-bug-report-tool'}/>
      <Card style={{width: '70vw', overflowY: 'scroll'}} className={'text-white bg-dark justify-content-center border-white d-block'}>
        {cmd}
          <Form style={{width: '85%'}} className={'d-block mx-auto align-top my-lg-4 my-md-3 my-sm-2'} onSubmit={generateCommand}>
            <FormGroup>
              <FormLabel>Report Title</FormLabel>
              <FormControl id={'title'} type={'text'} placeholder={'e.g. Discord crashes when I send a DM to anyone'} required={true}/>
            </FormGroup>
            <FormGroup>
              <FormLabel>Reproduction Steps</FormLabel>
              <Row className={'mx-0 no-gutters mb-2'}>
                <Card style={{width: '100%'}} className={'text-white bg-dark justify-content-center border-white d-block'}>
                  <ul className={'my-2'}>
                    {stepElements}
                  </ul>
                </Card>
              </Row>
              <Row className={'mx-0 no-gutters'}>
                <Col>
                  <FormControl id={'tempStep'} type={'text'} placeholder={'e.g. Open Discord'}/>
                </Col>
                <Col xs={'1'} className={'float-right'}>
                  <Button color={'primary'} className={'float-right'} onClick={addStep}>+</Button>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <FormLabel>Expected Results</FormLabel>
              <FormControl id={'expected'} type={'text'} placeholder={'e.g. Discord does not crash'} required={true}/>
            </FormGroup>
            <FormGroup>
              <FormLabel>Actual Results</FormLabel>
              <FormControl id={'actual'} type={'text'} placeholder={'e.g. Discord crashes'} required={true}/>
            </FormGroup>
            <FormGroup>
              <FormLabel>Client Settings</FormLabel>
              <FormControl id={'client'} type={'text'} placeholder={'e.g. Discord Canary 25565 (e12134f)'} required={true}/>
            </FormGroup>
            <FormGroup>
              <FormLabel>System Settings</FormLabel>
              <FormControl id={'system'} type={'text'} placeholder={'e.g. Windows 10 Pro x64 v20H2 (OS Build 19042.746)'} required={true}/>
            </FormGroup>
            <Button color={'primary'} type={'submit'}>Generate Command</Button>
          </Form>
      </Card>
    </Container>
  );
}