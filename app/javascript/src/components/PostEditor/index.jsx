import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Title from 'components/PostEditorTitle'
import RichTextEditor from 'components/PostRichTextEditor'
import Serializer from 'components/PostSerializer'

const styles = theme => ({
  tabContents: {
    padding: theme.spacing.unit * 2,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
})

const serializer = new Serializer()

class PostEditor extends Component {
  state = {
    title: '',
    value: serializer.deserialize(''),
    currentTab: 'edit',
  }

  UNSAFE_componentWillMount() {
    if (this.props.post.number) {
      this.props.fetchPost(this.props.team.name, this.props.post.number)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.post.title,
      value: serializer.deserialize(nextProps.post.body),
    })
  }

  handleSaveClick = () => {
    const markdown = serializer.serialize(this.state.value)
    if (this.props.post.number) {
      this.props.updatePost(
        this.props.team.name,
        this.props.post.number,
        this.state.title,
        markdown
      )
    } else {
      this.props.createPost(this.props.team.name, this.state.title, markdown)
    }
  }

  handleTitleChange = event => {
    this.setState({
      title: event.target.value,
    })
  }

  handleTabChange = (event, value) => {
    this.setState({ currentTab: value })
  }

  handleEditorChange = ({ value }) => {
    this.setState({ value })
  }

  renderTabContents(tab) {
    switch (tab) {
      case 'edit':
        return (
          <RichTextEditor
            value={this.state.value}
            onChange={this.handleEditorChange}
          />
        )
      case 'markdown':
        return <pre>{serializer.serialize(this.state.value)}</pre>
      case 'raw':
        return <pre>{JSON.stringify(this.state.value, undefined, '  ')}</pre>
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <Typography variant="headline" component="h3">
          <Title title={this.state.title} onChange={this.handleTitleChange} />
        </Typography>
        <Tabs value={this.state.currentTab} onChange={this.handleTabChange}>
          <Tab value="edit" label="Edit" />
          <Tab value="markdown" label="Markdown" />
          <Tab value="raw" label="Raw" />
        </Tabs>
        <div className={classes.tabContents}>
          {this.renderTabContents(this.state.currentTab)}
        </div>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSaveClick}
            className={classes.button}
          >
            SAVE
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(PostEditor)
