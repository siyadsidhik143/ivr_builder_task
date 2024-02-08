import React, { useState } from 'react'
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { saveDraftBtnClick, NewBuildBtn } from './HeaderSlice';
import { currentBuild, updateDraft } from '../HomePage/HomePageSlice';

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch()
    const { drafts, current_build } = useSelector((state) => state.homePageStates)
    const { newBuild } = useSelector((state) => state.headerFunctions)

    const [selectedIndex, setSelectedIndex] = useState(-1)
    console.log(selectedIndex)

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleSelect = (e) => {
        if (e.target.value !== '') {
            dispatch(currentBuild(JSON.parse(e.target.value)))
            dispatch(NewBuildBtn(false))
            setSelectedIndex(e.target.selectedIndex)
        }
    }

    // console.log(drafts)

    // const saveOrUpdateDraft = () => {
    //     const existingDraftIndex = drafts.findIndex((d) => d.id === current_build.id);
    //     console.log(existingDraftIndex)
    //     if (newBuild === false && existingDraftIndex !== -1) {
    //         const updatedDrafts = [...drafts];
    //         updatedDrafts[existingDraftIndex] = current_build
    //         dispatch(updateDraft(updatedDrafts));
    //         alert('Updated Successfully')
    //     } else {
    //         dispatch(saveDraftBtnClick(true));
    //         dispatch(NewBuildBtn(false));
    //     }
    // }

    const saveOrUpdateDraft = () => {
        if (newBuild === false && selectedIndex !== -1) {
            const updatedDrafts = [...drafts];
            updatedDrafts[selectedIndex] = current_build
            dispatch(updateDraft(updatedDrafts));
            alert('Updated Successfully')
        } else {
            setSelectedIndex(drafts.length)
            dispatch(saveDraftBtnClick(true));
            dispatch(NewBuildBtn(false));
        }
    }

    return (
        <Navbar expand="lg" variant="light" className='container'>
            <Navbar.Brand href="#">Outbound Sales Call SaaS Onboarding</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
            <Navbar.Collapse id="basic-navbar-nav" className={expanded ? 'show' : ''}>
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    <Nav className="mr-auto">
                        <select
                            className='form-select me-3'
                            onChange={(e) => handleSelect(e)}
                        >
                            {/* <option value=''>Select Draft</option>   */}
                            {drafts?.length && drafts?.map((node, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={JSON.stringify(node)}>
                                        Draft {index + 1}
                                    </option>
                                )
                            })}
                        </select>
                        <Button
                            className={newBuild ? 'btn-success' : 'btn-primary'}
                            onClick={saveOrUpdateDraft}>
                            {newBuild ? 'Save' : 'Update'}
                        </Button>
                        <Button
                            className='btn-warning ml-2'
                            onClick={() => dispatch(NewBuildBtn(true))}
                        >
                            New</Button>

                    </Nav>
                </Form>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default Header
