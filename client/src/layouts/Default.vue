<!-- <template> -->
<!--   <q-layout class="bg-grey-1" view="hHh lpR lFf"> -->
<!--     <q-header bordered class="text-black" style="background: #fff"> -->
<!--       <q-toolbar> -->
<!--         <q-btn -->
<!--           flat -->
<!--           dense -->
<!--           round -->
<!--           @click="leftDrawerOpen = !leftDrawerOpen" -->
<!--           aria-label="Menu" -->
<!--           icon="menu" -->
<!--         /> -->

<!--         <q-toolbar-title> -->
<!--           Stuckoverlow -->
<!--         </q-toolbar-title> -->

<!--         <q-input -->
<!--           style="width: 55%" -->
<!--           class="bg-white" -->
<!--           dense -->
<!--           standout="bg-warning" -->
<!--           v-model="search" -->
<!--           placeholder="Search" -->
<!--         > -->
<!--           <template v-slot:prepend> -->
<!--             <q-icon v-if="search === ''" name="search" /> -->
<!--             <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" /> -->
<!--           </template> -->
<!--         </q-input> -->

<!--         <q-space /> -->

<!--         <q-btn -->
<!--           v-if="$q.screen.gt.xs" -->
<!--           flat -->
<!--           dense -->
<!--           no-wrap -->
<!--           color="white" -->
<!--           icon="add" -->
<!--           no-caps -->
<!--           label="Ask a question" -->
<!--           class="q-ml-sm q-px-md bg-warning" -->
<!--         > -->
<!--           <q-menu anchor="top right" self="top right"> -->
<!--             <q-list class="text-grey-8" style="min-width: 100px"> -->
<!--               <q-item aria-hidden="true"> -->
<!--                 <q-item-section class="text-uppercase text-grey-7" style="font-size: 0.7rem"> -->
<!--                   Ask a question -->
<!--                 </q-item-section> -->
<!--               </q-item> -->
<!--             </q-list> -->
<!--           </q-menu> -->
<!--         </q-btn> -->

<!--         <div class="q-gutter-sm row items-center no-wrap"> -->
<!--           <q-btn round dense flat color="text-grey-7" icon="apps"> -->
<!--             <q-tooltip>Google Apps</q-tooltip> -->
<!--           </q-btn> -->
<!--           <q-btn round dense flat color="grey-8" icon="notifications"> -->
<!--             <q-badge color="red" text-color="white" floating> -->
<!--               2 -->
<!--             </q-badge> -->
<!--             <q-tooltip>Notifications</q-tooltip> -->
<!--           </q-btn> -->
<!--           <q-btn round flat> -->
<!--             <q-avatar size="26px"> -->
<!--               <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
<!--             </q-avatar> -->
<!--             <q-tooltip>Account</q-tooltip> -->
<!--           </q-btn> -->
<!--         </div> -->
<!--       </q-toolbar> -->
<!--     </q-header> -->

<!--     <q-drawer v-model="leftDrawerOpen" content-class="bg-grey-2"> -->
<!--       <q-list> -->
<!--         <q-item-label header>Menu</q-item-label> -->
<!--         <q-item to="/" exact> -->
<!--           <q-item-section avatar> -->
<!--             <q-icon name="home" /> -->
<!--           </q-item-section> -->
<!--           <q-item-section> -->
<!--             <q-item-label>Home</q-item-label> -->
<!--           </q-item-section> -->
<!--         </q-item> -->
<!--         <q-item to="/about" exact> -->
<!--           <q-item-section avatar> -->
<!--             <q-icon name="local_offer" /> -->
<!--           </q-item-section> -->
<!--           <q-item-section> -->
<!--             <q-item-label>Tags</q-item-label> -->
<!--           </q-item-section> -->
<!--         </q-item> -->
<!--         <q-item to="/users" exact> -->
<!--           <q-item-section avatar> -->
<!--             <q-icon name="people" /> -->
<!--           </q-item-section> -->
<!--           <q-item-section> -->
<!--             <q-item-label>Users</q-item-label> -->
<!--           </q-item-section> -->
<!--         </q-item> -->

<!--         <q-item-label header>Dashboard</q-item-label> -->
<!--         <q-item clickable tag="a" target="_blank" href="https://quasar.dev"> -->
<!--           <q-item-section avatar> -->
<!--             <q-icon name="person" /> -->
<!--           </q-item-section> -->
<!--           <q-item-section> -->
<!--             <q-item-label>Profile</q-item-label> -->
<!--           </q-item-section> -->
<!--         </q-item> -->
<!--         <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/"> -->
<!--           <q-item-section avatar> -->
<!--             <q-icon name="help" /> -->
<!--           </q-item-section> -->
<!--           <q-item-section> -->
<!--             <q-item-label>Your questions</q-item-label> -->
<!--           </q-item-section> -->
<!--         </q-item> -->
<!--         <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev"> -->
<!--           <q-item-section avatar> -->
<!--             <q-icon name="question_answer" /> -->
<!--           </q-item-section> -->
<!--           <q-item-section> -->
<!--             <q-item-label>Your answers</q-item-label> -->
<!--           </q-item-section> -->
<!--         </q-item> -->
<!--         <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev"> -->
<!--           <q-item-section avatar> -->
<!--             <q-icon name="settings_applications" /> -->
<!--           </q-item-section> -->
<!--           <q-item-section> -->
<!--             <q-item-label>Settings</q-item-label> -->
<!--           </q-item-section> -->
<!--         </q-item> -->
<!--       </q-list> -->
<!--     </q-drawer> -->

<!--     <q-page-container> -->
<!--       <router-view /> -->
<!--     </q-page-container> -->
<!--   </q-layout> -->
<!-- </template> -->

<!-- <script> -->
<!-- export default { -->
<!--   name: 'LayoutDefault', -->

<!--   data() { -->
<!--     return { -->
<!--       leftDrawerOpen: this.$q.platform.is.desktop, -->
<!--       search: '' -->
<!--     } -->
<!--   } -->
<!-- } -->
<!-- </script> -->
