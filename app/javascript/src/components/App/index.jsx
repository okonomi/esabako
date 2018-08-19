import React, { Fragment } from 'react'
import NotificationsSystem from 'reapop'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import theme from 'reapop-theme-bootstrap'
import PostEditor from 'containers/PostEditor'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
  },
})

const App = props => {
  const { classes } = props

  return (
    <Fragment>
      <CssBaseline />
      <NotificationsSystem theme={theme} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <PostEditor />
        </Paper>
      </main>
    </Fragment>
  )
}

export default withStyles(styles)(App)
