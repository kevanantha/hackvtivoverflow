const Answer = require('../models/Answer')

module.exports = {
  async upvote(req, res, next) {
    try {
      const question = await Answer.findById(req.params.questionId)
      if (Object.keys(question).length) {
        const filterVote = question.votes.filter(q => q.userId == req.user.id)
        if (filterVote.length) {
          console.log(filterVote)
          if (filterVote[0].voteType == 1) {
            await Answer.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $pull: {
                  votes: {
                    userId: req.user.id
                  }
                }
              }
            )
            res.status(200).json({ message: 'updated, from upvote' })
          } else if (filterVote[0].voteType == -1) {
            await Answer.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $pull: {
                  votes: {
                    userId: req.user.id
                  }
                }
              }
            )
            await Answer.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $push: {
                  votes: { userId: req.user.id, voteType: 1 }
                }
              }
            )
            res.status(200).json({ message: 'updated, from downvote' })
          }
        } else {
          await Answer.updateOne(
            {
              _id: req.params.questionId
            },
            {
              $push: {
                votes: { userId: req.user.id, voteType: 1 }
              }
            }
          )
          res.status(200).json({ message: 'updated, new up vote' })
        }
      } else {
        const err = new Error('404 Not Found')
        err.name = 'NotFound'
        next(err)
      }
    } catch (err) {
      next(err)
    }
  },
  async downvote(req, res, next) {
    try {
      const question = await Answer.findById(req.params.questionId)
      if (Object.keys(question).length) {
        const filterVote = question.votes.filter(q => q.userId == req.user.id)
        if (filterVote.length) {
          console.log(filterVote)
          if (filterVote[0].voteType == -1) {
            await Answer.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $pull: {
                  votes: {
                    userId: req.user.id
                  }
                }
              }
            )
            res.status(200).json({ message: 'updated, from downvote' })
          } else if (filterVote[0].voteType == 1) {
            await Answer.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $pull: {
                  votes: {
                    userId: req.user.id
                  }
                }
              }
            )
            await Answer.updateOne(
              {
                _id: req.params.questionId
              },
              {
                $push: {
                  votes: { userId: req.user.id, voteType: -1 }
                }
              }
            )
            res.status(200).json({ message: 'updated, from upvote' })
          }
        } else {
          await Answer.updateOne(
            {
              _id: req.params.questionId
            },
            {
              $push: {
                votes: { userId: req.user.id, voteType: -1 }
              }
            }
          )
          res.status(200).json({ message: 'updated, new downvote' })
        }
      } else {
        const err = new Error('404 Not Found')
        err.name = 'NotFound'
        next(err)
      }
    } catch (err) {
      next(err)
    }
  }
}
