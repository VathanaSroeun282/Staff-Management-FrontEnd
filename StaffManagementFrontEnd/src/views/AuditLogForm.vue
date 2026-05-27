  <template>
    <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[100vh] gap-4">
    <img 
      src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyMWM3MnhnOGp4cHgwZ3YyemEwdzZieXUweDZyZHA4eTViNG9tam1ieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pY8jLmZw0ElqvVeRH4/200w.gif" 
      class="w-60 h-60"
    />
    <h1 class="text-lg font-semibold animate-pulse">Loading...</h1>
  </div>
    <div class="max-w-md mx-auto p-6 bg-white text-black shadow-md rounded-xl mt-8">
      <h1 class="text-2xl font-bold mb-4">
        {{ isEdit ? 'Edit Audit-Log' : 'Create Audit-Log' }}
      </h1>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block font-medium mb-1">Audit Log ID</label>
          <input type="text" v-model="auditLog.auditLogID" disabled class="w-full border rounded px-3 py-2">
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Change Type</label>
          <input v-model="auditLog.changeType" type="text" class="w-full border rounded px-3 py-2" required />
        </div>

        <div class="mb-4">
          <label class="block font-medium mb-1">Change Date</label>
          <input v-model="auditLog.changeDate" type="date" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Changed By</label>
          <input v-model="auditLog.changedBy" type="number" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Employee Name</label>
          <p v-if="isEdit" class="block font-normal mb-1">Current Employee: <span>{{ auditLog.employeeName }}</span></p>
          <br>
          <select
            v-model="auditLogUpdate.employeeID"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option disabled value="">Select Employee</option>
            <option
              v-for="staff in staffs"
              :key="staff.employeeID"
              :value="staff.employeeID"
            >
              {{ staff.firstName }} {{ staff.lastName }}
            </option>
          </select>
        </div>
        <div class="mt-6 flex justify-between">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>

          <router-link to="/auditlogs" class="text-gray-600 hover:underline">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </template>

  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router'
  import type { AuditLogUpdate, AuditLog } from '@/types/AuditLog'
  import type { Employee } from '@/types/Employee'
  import { AuditLogAPI, EmployeeAPI } from '@/end points/EndPointLinks'

  export default defineComponent({
    setup() {
      const isLoading = ref(true)
      const auditLog = ref<AuditLog>({
          auditLogID : 0,
          changeType : "",
          changeDate : "",
          changedBy : 0,
          employeeName : ""
      });
      const auditLogUpdate = ref<AuditLogUpdate>({
        auditLogID: 0,
        changeType: "",
        changeDate: "",
        changedBy: 0,
        employeeID : 0
      })
      const staffs = ref<Employee[]>([])
      const isEdit = ref(false)
      const route = useRoute()
      const router = useRouter()

      const fetchStaffs = async () => {
        const res = await axios.get<Employee[]>(EmployeeAPI)
        staffs.value = res.data
      }
      //Search for Staff ID by Name
      const getEmployeeIDByName = (name: string): number | 0 => {
        const staff = staffs.value.find(s => {
          const fullName = `${s.firstName} ${s.lastName}`.toLowerCase()
          return fullName === name.toLowerCase()
        })
        return staff ? staff.employeeID : 0
      }
 
      const fetchAuditLog = async (id: number) => {
        const res = await axios.get<AuditLog>(`${AuditLogAPI}/${id}`)
        auditLog.value = {
          ...res.data,
          changeDate: res.data.changeDate.split('T')[0]
        }
        auditLogUpdate.value = {...res.data, employeeID: getEmployeeIDByName(res.data.employeeName) }
      }

      const handleSubmit = async () => {
        try {
          const employeeID = getEmployeeIDByName(auditLog.value.employeeName);
          const payload = {
            changeType: auditLog.value.changeType,
            changeDate: auditLog.value.changeDate,
            changedBy: auditLog.value.changedBy,
            employeeID: employeeID
          }
          if (isEdit.value) {
            await axios.put(`${AuditLogAPI}/${auditLog.value.auditLogID}`, payload)
          } else {
            await axios.post(AuditLogAPI, payload)
          }

          router.push('/auditlogs')
        } catch (err) {
          console.error(err)
          alert('Error occurred.')
        }
      }
      onMounted(async () => {
        try{
          await fetchStaffs()

          const id = Number(route.params.id)
          if (!isNaN(id) && id > 0) {
            isEdit.value = true
            await fetchAuditLog(id)
          }
        }finally{
          isLoading.value = false;
        }
      })

      return {
        isLoading,
        auditLog,
        isEdit,
        staffs,
        auditLogUpdate,
        handleSubmit
      }
    },
  })
  </script>