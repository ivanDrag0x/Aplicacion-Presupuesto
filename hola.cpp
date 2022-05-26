#include <iostream>
#define limite 5
using namespace std;

void insertar(char datos[], int tiempo[], int numero){
     for(int i = 0; i < (numero); i++){
         cout<<"inserte el tiempo en el proceso ["<<datos[i]<<"]: ";
         cin>>tiempo[i];
     }
}

int quantum(int tiempo[],int numero){
    int resultado = 0;
    for(int i = 0; i < numero;++i)
      resultado += tiempo[i];
    resultado /= numero;
    return resultado;
}

void RoundRobin(char datos[], int tiempo[], int numero){
    insertar(datos,tiempo, numero);
    int Quantum = quantum(tiempo,numero);
    cout<<"El quantum es: "<< Quantum <<endl;
    int tiempoFinal = 0;
    float sumatoria = 0.0f;
    int metalera = 0;
    int i = 0;
    do{ 
      tiempo[i] != 0 ? tiempo[i] -= Quantum : ++i;
      if(tiempo[i] > 0)
          tiempoFinal += Quantum;
      else{
          tiempoFinal += Quantum+tiempo[i];
          sumatoria += tiempoFinal;
          cout << "el tiempo de proceso de " << datos[i] << ": " 
          << tiempoFinal << endl;
          metalera++;
      }
      i < (numero - 1) ? i++ : i = 0;
    }while(metalera < numero);
    sumatoria /= numero;
    cout << "Tiempo promedio de los procesos es: " 
    << sumatoria << endl;
}


int main(){
    char datos[limite] = {'a','b','c','d','e'};
    int tiempo[limite];
    RoundRobin(datos,tiempo,limite);
    cin.get();
    cin.get();
    return 0;
}