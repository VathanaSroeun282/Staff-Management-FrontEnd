<template>
  <div v-if="loading" class="flex flex-col items-center justify-center min-h-[100vh] gap-4">
    <img 
      src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyMWM3MnhnOGp4cHgwZ3YyemEwdzZieXUweDZyZHA4eTViNG9tam1ieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pY8jLmZw0ElqvVeRH4/200w.gif" 
      class="w-60 h-60"
    />
    <h1 class="text-lg font-semibold animate-pulse">Loading...</h1>
  </div>

  <div v-else class="p-6">
    <h1 class="text-2xl font-bold mb-4">AuditLog List</h1>

    <router-link
      to="/auditLogs/create"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
    >
      + Add AuditLog
    </router-link>

    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Change Type</th>
          <th class="border px-4 py-2">Change Date</th>
          <th class="border px-4 py-2">Change By</th>
          <th class="border px-4 py-2">Employee Name</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="auditLogs.length === 0">
          <td colspan="5" class="text-center py-4">No auditLog found</td>
        </tr>

        <tr v-for="auditLog in auditLogs" :key="auditLog.auditLogID">
          <td class="border px-4 py-2">{{ auditLog.auditLogID }}</td>
          <td class="border px-4 py-2">{{ auditLog.changeType }}</td>
          <td class="border px-4 py-2">{{ formatTime(auditLog.changeDate) }}</td>
          <td class="border px-4 py-2">{{ auditLog.changedBy }}</td>
          <td class="border px-4 py-2">{{ auditLog.employeeName }}</td>
          <td class="border px-4 py-2"> 
            <router-link
              :to="{name:'audit-log-edit',params:{id: auditLog.auditLogID}}"
              class="text-blue-600 hover:underline"
            >
              Edit
            </router-link>

            <button
              @click="deleteAuditLog(auditLog.auditLogID)"
              class="text-red-600 ml-4"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import type { AuditLog } from '@/types/AuditLog'
import { AuditLogAPI } from '@/end points/EndPointLinks'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const auditLogs = ref<AuditLog[]>([])

    const loadAuditLog = async () => {
      loading.value = true
      try {
        const res = await axios.get<AuditLog[]>(AuditLogAPI)
        auditLogs.value = res.data
      } finally {
        loading.value = false
      }
    }

    const deleteAuditLog = async (id: number) => {
      if (!confirm('Are you sure you want to delete this auditlog?')) return

      try {
        await axios.delete(`${AuditLogAPI}/${id}`)

        // 🔥 instant update (no reload)
        auditLogs.value = auditLogs.value.filter(a => a.auditLogID !== id)

      } catch (error) {
        console.error(error)
        alert('Delete failed')
      }
    }

    // 🔥 format datetime -> HH:mm
    const formatTime = (datetime: string) => {
      //return datetime?.split("T")[0]
      const date = new Date(datetime)

      const day = String(date.getDate()).padStart(2, '0')

      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]

      const month = months[date.getMonth()]
      const year = date.getFullYear()

      return `${day}-${month}-${year}`
    }

    onMounted(() => {
      loadAuditLog()
    })

    return {
      auditLogs,
      deleteAuditLog,
      loading,
      formatTime
    }
  },
})
</script>