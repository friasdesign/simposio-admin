import * as React from 'react'

import * as SubsEnt from '../../entities/Subscripcion'
import * as SubsServ from '../../components/Subscripcion/Service'

import ListSubs from '../../components/Subscripcion/List/List'
import Layout from '../../components/Layout/Layout'

import SubsModal from './components/SubsModal'

type Props = {} & SubsServ.IWithService

interface IState {
  results: SubsEnt.ISubscripcion[],
  modalOpen: boolean,
  modalData: SubsEnt.ISubscripcion,
}

class List extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      results: [
        SubsEnt.FixSubscripcion,
        Object.assign({}, SubsEnt.FixSubscripcion, { documento: 123456789 }),
      ],
      modalOpen: false,
      modalData: SubsEnt.EmptySubscripcion,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  public render() {
    const {
      results,
      modalData,
      modalOpen,
    } = this.state
    return (
      <section className="container list-container">
        <ListSubs results={results} rowClickHandler={this.openModal} />
        {
          <SubsModal
            subscripcion={modalData}
            open={modalOpen}
            onClose={this.closeModal}
            subsServ={this.props.subsServ}
          />
        }
      </section>
    )
  }

  private openModal(e: React.MouseEvent<HTMLTableRowElement>) {
    this.setState(Object.assign({}, this.state, {
      modalOpen: true,
      modalData: SubsEnt.FixSubscripcion,
    }))
  }

  private closeModal() {
    this.setState(Object.assign({}, this.state, {
      modalOpen: false,
    }))
  }
}

export default SubsServ.withSubscripcion<Props>((props: Props) => <Layout render={<List {...props} />} />)
