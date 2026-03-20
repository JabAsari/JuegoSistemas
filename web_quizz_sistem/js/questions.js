// Objeto que contiene todas las preguntas organizadas por niveles
const quizzData = {
    "1": [ // Nivel 1: Lenguaje Ensamblador 8086
        {
            pregunta: "¿Qué nombre reciben los comandos que no generan código para la CPU, sino que dan instrucciones al ensamblador?",
            opciones: ["Etiquetas.", "Flags de Estado.", "Directivas."],
            respuesta: "Directivas."
        },
        {
            pregunta: "Si necesito reservar un espacio de memoria de exactamente 8 bits, ¿qué directiva utilizo?",
            opciones: ["DB (Define Byte).", "DW (Define Worl).", "DD (Define Double Word)."],
            respuesta: "DB (Define Byte)."
        },
        {
            pregunta: "¿Cuál es la directiva que reserva 16 bits (una palabra) en la memoria?",
            opciones: ["DB.", "DW (Define Word).", "DS."],
            respuesta: "DW (Define Word)."
        },
        {
            pregunta: "¿Qué directiva se emplea para reservar un espacio de memoria de 32 bits?",
            opciones: ["DW.", "DD (Define Double Word).", "RAX."],
            respuesta: "DD (Define Double Word)."
        },
        {
            pregunta: "¿Cómo se llama el área de memoria dedicada exclusivamente al almacenamiento de variables?",
            opciones: ["Segmento de Código (CS).", "Segmento de Datos (DS).", "Buffer."],
            respuesta: "Segmento de Datos (DS)."
        },
        {
            pregunta: "¿Qué nombre recibe el área de memoria donde reside el programa ejecutable?",
            opciones: ["Segmento de Datos (DS).", "Bus de Direcciones.", "Segmento de Código (CS)."],
            respuesta: "Segmento de Código (CS)."
        },
        {
            pregunta: "¿Qué término define a los identificadores seguidos de dos puntos que marcan una posición en el código para realizar saltos?",
            opciones: ["Etiquetas.", "Directivas.", "Flags."],
            respuesta: "Etiquetas."
        }

    ],
    "2": [ // Nivel 2: Interacciones y INT 21h
        {
            pregunta: "¿Cuál es la interrupción principal del DOS que ofrece servicios de entrada/salida?",
            opciones: ["INT 21h.", "Función AH.", "Servicio 4Ch."],
            respuesta: "INT 21h."
        },
        {
            pregunta: "¿En qué registro se debe colocar el número del servicio deseado antes de llamar a una interrupción?",
            opciones: ["DL.", "Función AH.", "BP."],
            respuesta: "Función AH."
        },
        {
            pregunta: "¿Qué servicio de la INT 21h se utiliza para imprimir un solo carácter en pantalla?",
            opciones: ["Servicio 09h.", "Servicio 02h.", "Servicio 4Ch."],
            respuesta: "Servicio 02h."
        },
        {
            pregunta: "¿Qué servicio permite imprimir una cadena de texto (string) que termina con el símbolo $?",
            opciones: ["Servicio 02h.", "Servicio 09h.", "Servicio 4Ch."],
            respuesta: "Servicio 09h."
        },
        {
            pregunta: "¿Qué función estándar se usa para terminar un programa y devolver el control al sistema operativo?",
            opciones: ["Servicio 4Ch.", "Global _start.", "INT 21h."],
            respuesta: "Servicio 4Ch."
        },
        {
            pregunta: "¿Cómo se llama el espacio de memoria temporal utilizado para almacenar datos de entrada?",
            opciones: ["Segmento de Datos.", "Buffer.", "Pila (Stack)."],
            respuesta: "Buffer."
        },
        {
            pregunta: "¿Qué término se refiere a los bits individuales que indican el resultado de la última operación (cero, acarreo, etc.)?",
            opciones: ["Etiquetas.", "Flags de Estado.", "Desplazamiento."],
            respuesta: "Flags de Estado."
        }
    ],
    "3": [ // Nivel 3: Modos de Direccionamiento
        {
            pregunta: "¿Cómo se define la distancia en bytes desde el inicio de un segmento hasta una posición específica?",
            opciones: ["Segmentación.", "Desplazamiento (Offset).", "Bus de Direcciones."],
            respuesta: "Desplazamiento (Offset)."
        },
        {
            pregunta: "¿Qué técnica permite manejar 1 MB de memoria usando registros de solo 16 bits?",
            opciones: ["Segmentación.", "Aritmética de Registros.", "Little Endian."],
            respuesta: "Segmentación."
        },
        {
            pregunta: "¿Qué modo de direccionamiento suma un registro de base y uno de índice para hallar la dirección?",
            opciones: ["Desplazamiento.", "Base + Índice.", "Segmentación."],
            respuesta: "Base + Índice."
        },
        {
            pregunta: "¿Qué registro se utiliza comúnmente para acceder a datos dentro del marco de la pila?",
            opciones: ["BP (Base Pointer).", "RAX.", "EAX."],
            respuesta: "BP (Base Pointer)."
        },
        {
            pregunta: "¿Cuál es el canal físico que determina cuánta memoria puede 'ver' el procesador (20 bits en el 8086)?",
            opciones: ["Bus de Direcciones.", "Buffer.", "Segmento de Datos."],
            respuesta: "Bus de Direcciones."
        }
    ],
    "4": [ // Nivel 4: Registros Modernos
        {
            pregunta: "¿Cómo se llaman los registros de propósito general de 64 bits en arquitecturas modernas?",
            opciones: ["EAX/EBX.", "AX/AL/AH.", "RAX/RBX."],
            respuesta: "RAX/RBX."
        },
        {
            pregunta: "¿A qué arquitectura corresponden los registros EAX/EBX?",
            opciones: ["Versión de 16 bits.", "Versión de 32 bits.", "Versión de 64 bits."],
            respuesta: "Versión de 32 bits."
        },
        {
            pregunta: "¿Qué divisiones del registro de 16 bits permiten acceder a la parte baja (L) o alta (H) de 8 bits?",
            opciones: ["AX/AL/AH.", "EAX/EBX.", "RAX/RBX."],
            respuesta: "AX/AL/AH."
        },
        {
            pregunta: "¿Qué directiva indica al sistema operativo dónde comienza exactamente la ejecución del programa?",
            opciones: ["Global _start.", "Segmento de Código.", "Etiquetas."],
            respuesta: "Global _start."
        },
        {
            pregunta: "¿En qué formato de almacenamiento el byte menos significativo se guarda en la dirección más baja?",
            opciones: ["Big Endian.", "Little Endian.", "Aritmética de Registros."],
            respuesta: "Little Endian."
        },
        {
            pregunta: "¿Cómo se denominan las operaciones como ADD o SUB realizadas directamente entre las unidades de almacenamiento de la CPU?",
            opciones: ["Aritmética de Registros.", "Directivas.", "Modos de Direccionamiento."],
            respuesta: "Aritmética de Registros."
        }
    ]
};