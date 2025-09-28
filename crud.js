import { database } from "./firebaseConfig.js";
import {
    ref,
    push,
    set,
    child,
    remove
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const machineRef = ref(database, "machines");
let newMachineReference = ""
let blab = ""

export async function addMachine() {
    try {
        newMachineReference = push(machineRef)
        const pinValue = newMachineReference.key
        return pinValue
    } catch (error) {
        console.log("Error: "+error)
        alert("Erro ao conectar com a base de dados: "+error)
    }

}
export async function updateValues(pin, isPowered, isOn, cool, temp, activeTime, consumption) {
    await set(child(machineRef, pin), { isPowered, isOn, cool, temp, activeTime, consumption })
}
export async function deleteMachine(id) {
    const delRef = child(machineRef, id);
    await remove(delRef)
}