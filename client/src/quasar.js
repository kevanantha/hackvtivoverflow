import Vue from 'vue'

import './styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Quasar,
  QSpace,
  QBtnDropdown,
  QPopupEdit,
  QCard,
  QEditor,
  QForm,
  QSeparator,
  QInput,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  LoadingBar,
  QIcon,
  QCardSection,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QMenu,
  QTooltip,
  QBadge,
  QToggle,
  QAvatar,
  Dialog,
  Notify
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QTooltip,
    QBadge,
    QToggle,
    QCardSection,
    QCard,
    QSeparator,
    QForm,
    QEditor,
    QMenu,
    QBtnDropdown,
    QPopupEdit,
    QSpace,
    QInput,
    LoadingBar,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QAvatar,
    QItemSection,
    QItemLabel
  },
  directives: {},
  plugins: {
    Dialog,
    Notify,
    LoadingBar
  }
})
