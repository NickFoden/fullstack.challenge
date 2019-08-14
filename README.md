# [Double](https://withdouble.com) · Full-stack engineering challenge

:wave: If you're looking for an adventure, [look no further](https://withdouble.com/jobs).

## Instructions

- To complete this challenge, you will need `npm`, `node` and `git` installed locally
- Solve each level in order
- Include the `.git` directory when submitting your solution
- Don't spend more than **4 hours** on this test
- To start the app:
  - run `npm i`
  - run `npm start`
  - open `http://localhost:8080/`
- If needed, here are the documentation links of: [React](https://reactjs.org/), [Mobx](https://mobx.js.org/index.html) and [Luxon](https://moment.github.io/luxon/index.html)


### Pointers

- Keep in mind that you are working on an existing code-base.
- Code should be clean, extensible and robust. Don't overlook edge cases.
- You will have to create some basic UI. While we're not expecting you to be a skilled designer, it should come close to the look and feel of the app. We *are* looking for engineers with some product-sense.
- We like [emojis](https://gitmoji.carloscuesta.me/) :wink:


### Submitting your results

2 possibilities:
1. Fork this repository and send us a Pull Request
2. Clone this repository and share yours with [@pierre-elie](https://github.com/pierre-elie) and [@quentinsl](https://github.com/quentinsl)

In both cases, we will review your code within 3 days and will be in touch via email



Let's do this! :muscle:


## Challenge

**Double helps executives and their assistants work better together**. Managing agendas is an important part of an assistant's job, and we're inviting you to join our mission of making assistants's lives easier.

### Level 1: Agenda's title bug fix

One of our users just submitted a bug report: the agenda's title ("Good morning", "Good afternoon", etc.) does not always update as the day goes by.
Identify the source of this behavior and fix it.


### Level 2: Filter agenda events by calendar

We want to add a filtering mechanism on agenda events. The requirements for this feature are:

1. Add a select menu that will filter events by `calendar`
2. When a calendar is selected, only events from that calendar are displayed
3. By default `all` calendars are displayed


### Level 3: Group agenda events by department

Another enhancement would be to show all calendar events in one page, grouping them by `department`. Here is a quick mock-up of what the feature could look like:

<img src="https://user-images.githubusercontent.com/45558407/61964225-5f967b80-af9b-11e9-9e39-b201a5644bf9.png" width="300" />

The requirements for this feature are:

1. Add a button to toggle groups by `department`
2. When enabled, events will be grouped and each group will be clearly identified
3. In each group, events will be sorted by ascending date-time


### Questions

Please add your answers to the questions below:

1. How long did you spend on this challenge?

4 hours. This project's EsLint rules and my editor did not get along. After trying prettier configs and various ideas had to get started and so spent a lot of time formatting my code while working on this.

2. In your opinion, what are features that Double could work on that would be helpful for assistants when managing agendas?

Reassigning tasks to other people, logging notes to the events, maybe organizing by address if errands/tasks in same area/proximity, warnings/alerts of when to leave to be ontime if event is not where the person is, labels by level of urgency/importance, asssigning subtask to self or someone with text/email reminders until task is completed, giving others permission/access to add to the calendar and view it, private events, warnings if a time is overloaded like a super busy afternoon warning

3. If you had more time, what would you add or change in the codebase?

I would research MobX more as I think I could refactor to do things in a more MobX way, and also would make sure my editor could format on save. And add more css styling. Was good intro to MobX. Using Decorators seems like they could be really powerful.

4. Do you have any constructive feedback that you would like to share with our team?

Good challenge. Seemed straightforward, but then getting into it Mobx and Flow are new to me. So was interesting to read documentation and work piece by piece and not be able to move fast and be continuously coding. I would be curious to hear how many people that this is their first intro to MobX or if they have used this before. 
