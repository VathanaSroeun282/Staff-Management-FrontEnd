  <template>
    <div class="max-w-md mx-auto p-6 bg-white text-black shadow-md rounded-xl mt-8">
      <h1 class="text-2xl font-bold mb-4">
        {{ isEdit ? 'Edit Audit-Log' : 'Create Audit-Log' }}
      </h1>

      <form @submit.prevent="handleSubmit">
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
          <select
            v-model="auditLog.employeeName"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option disabled value="">Select Employee</option>

            <option
              v-for="staff in staffs"
              :key="staff.employeeID"
              :value="`${staff.firstName} ${staff.lastName}`"
            >
              {{ staff.firstName }} {{ staff.lastName }}
            </option>
          </select>
        </div>
        <div class="mt-6 flex justify-between">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>

          <router-link to="/attendances" class="text-gray-600 hover:underline">
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
  import type { AuditLog } from '@/types/AuditLog'
  import type { Employee } from '@/types/Employee'
  import { AuditLogAPI, EmployeeAPI } from '@/end points/EndPointLinks'

  export default defineComponent({
    setup() {
      const auditLog = ref<AuditLog>({
          auditLogID : 0,
          changeType : "",
          changeDate : "",
          changedBy : 0,
          employeeName : ""
      });
      
      const staffs = ref<Employee[]>([])
      const isEdit = ref(false)
      const route = useRoute()
      const router = useRouter()

      const fetchStaffs = async () => {
        const res = await axios.get<Employee[]>(EmployeeAPI)
        staffs.value = res.data
      }
      //Search Staff by Name
      const getEmployeeIDByName = (name: string): number | null => {
        const staff = staffs.value.find(s => {
          const fullName = `${s.firstName} ${s.lastName}`.toLowerCase()
          return fullName === name.toLowerCase()
        })
        return staff ? staff.employeeID : null
      }

      const fetchAuditLog = async (id: number) => {
        const res = await axios.get<AuditLog>(`${AuditLogAPI}/${id}`)
        auditLog.value = res.data
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
        await fetchStaffs()

        const id = Number(route.params.id)
        if (!isNaN(id) && id > 0) {
          isEdit.value = true
          await fetchAuditLog(id)
        }
      })

      return {
        auditLog,
        isEdit,
        staffs,
        handleSubmit,
      }
    },
  })
  </script>