<template>
   <div class="modal is-active">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
         <header class="modal-card-head">
            <p class="modal-card-title">Edit item</p>
            <button
               class="delete"
               aria-label="close"
               @click="closeModal"
            ></button>
         </header>
         <section class="modal-card-body">
            <div class="field">
               <label class="label" for="name">Name</label>
               <input
                  class="input "
                  type="text"
                  placeholder="Name"
                  id="name"
                  v-model="itemCopy.name"
               />
            </div>
            <div class="field">
               <label class="label" for="status">Status</label>
               <div class="select is-fullwidth">
                  <select v-model="itemCopy.status" id="status">
                     <option value="unverified">unverified</option>
                     <option value="verified">verified</option>
                  </select>
               </div>
            </div>
         </section>
         <footer class="modal-card-foot">
            <button class="button is-success" @click="saveChanges">
               Save changes
            </button>
            <button class="button" @click="closeModal">Discard changes</button>
         </footer>
      </div>
   </div>
</template>
<script>
import { reactive } from 'vue'
export default {
   props: {
      item: {
         type: Object
      }
   },
   setup(props, { emit }) {
      const itemCopy = reactive({ ...props.item })
      const closeModal = () => emit('close')
      const saveChanges = () => emit('save', itemCopy)
      return { closeModal, saveChanges, itemCopy }
   }
}
</script>
