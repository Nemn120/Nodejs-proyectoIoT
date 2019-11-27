
import numpy as np
import pandas as pd
import seaborn as sns
from pymongo import MongoClient
import json
import sys

from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

def Prediccion(temperatura1,humedad_aire1,humedad_tierra1):

    url='https://raw.githubusercontent.com/victor-alex159/analisis02/master/Desktop/Analisis_regression_lineal_multiple02/productos_optimos.csv'
    datos = pd.read_csv(url) # Se lee el archivo csv con los datos optimos de cada producto

    #datos=datos.replace(np.nan, "0")
    #share=datos['share'].values
    
    #id_producto=datos['_id'].values
    ph=datos['Ph'].values
    humedad_aire=datos['Humedad Aire'].values
    humedad_tierra=datos['Humedad Tierra'].values
    temperatura=datos['Temperatura'].values
    #temperatura_2=datos['Temperatura Final'].values
    #co2=datos['CO2'].values

    X=np.array([temperatura,humedad_aire, humedad_tierra]).T # Se asigna las dependecias del ph a analizar
    Y=np.array(ph) # Ph a analizar
    
    reg=LinearRegression()
    reg=reg.fit(X,Y)
    Y_pred=reg.predict(X)
    #error=np.sqrt(mean_squared_error(Y,Y_pred))
    #r2=reg.score(X,Y)

    #print("El error es: ",error)
    #print("El valor de r^2 es: ",r2)
    #print("Los coeficientes son: '\n'", reg.coef_)
    #print()

    
    if (temperatura1>0 and humedad_aire1>0 and humedad_tierra1 ):
        temperatura=temperatura1
        humedad_aire=humedad_aire1
        humedad_tierra=humedad_tierra1

    else:
        return "Error en los datos de entrada"
        
    
    #temperatura_2=temperatura2
    

    x=reg.predict([[temperatura,humedad_aire, humedad_tierra]]) # Resultado del ph analizado
    valor=np.round(x,3) #Redondeo del resultado
    
    return valor

#resultado_envio=datos_enviar(12,13.4)
#print(resultado_envio)

def Productos(ph):

    #val=''.join(map(str, prediccion))
    #print("Ph del producto a recomendar es: ", val)
    #print()

    #print("Productos a recomendar:")

    #Se comprueba si el ph está dentro del rango establecido para dar con los productos optimos del csv
    if(ph>=4.3 and ph<4.5):
        productos1="Guanabana, Brocoli, Cebada"
        return productos1

    elif(ph>=4.5 and ph<5):
        productos2="Mani, Pinia, Esparrago ,Durazno, Guanabana"
        return productos2

    elif(ph>=5 and ph<5.2):
        productos3="Ajonjoli, Ajo, Cafe"
        return productos3

    elif(ph>=5.2 and ph<5.5):
        productos3="Fresa"
        return productos3

    elif(ph>=5.5 and ph<=5.8):
        productos4="Sandia, Papa, Frijol, Trigo"
        return productos4

    elif(ph>=5.8 and ph<6):
        productos5="Camote, Pera, Yuca"
        return productos5

    elif(ph>=6 and ph<6.2):
        productos6="Algodon, Maracuya, Pepino, Cebolla, Coliflor, Calabaza"
        return productos6

    elif(ph>=6.2 and ph<=6.3):
        productos7="Vainilla, Tomate"
        return productos7

    elif(ph>=6.3 and ph<6.4):
        productos8="Zanahoria"
        return productos8

    elif(ph>=6.4 and ph<6.5):
        productos9="Alcachofa"
        return productos9

    elif(ph>=6.5 and ph<6.7):
        productos10="Mango, Papaya, Platano, Palta, Cacao, Anis, Uva, Chirimoya, Col, Cana de azucar"
        return productos10

    elif(ph>=6.7 and ph<6.8):
        productos11="Lechuga"
        return productos11

    elif(ph>=6.8 and ph<7):
        productos12="Naranja, Mandarina, Lenteja, Apio"
        return productos12

    elif(ph>=7 and ph<8):
        productos13="Limon"
        return productos13

#salida=productos(resultado_envio)
#print(salida)

def recibe_nombre_usuario():
    lines = sys.stdin.readlines()
    
    return json.loads(lines[0])

def enviar_nombre_data():
    
    usuario_datos = recibe_nombre_usuario()
    data_nombre=''.join(map(str, usuario_datos))

    return data_nombre


if __name__ == '__main__':
    #Conexion con la base de datos 
    MONGO_URI='mongodb+srv://user:4ozvRkeatvDCUfPf@cluster0-tzeao.mongodb.net/cafe?retryWrites=true&w=majority'
    client=MongoClient(MONGO_URI)
    db=client['cafe'] #Conexion con la base de datos de los usuarios
    usuario=enviar_nombre_data() #Conexion con los datos capturados de un usuario en especifico
    collection=db[usuario] #Coleccion o tabla de datos de un usuario

    #Se hizo el promedio de todas las temperaturas, humedad aire, humedad tierra de los dato de un usuario
    datos=collection.aggregate([{  
    "$group": {
        "_id": "null", 
        "avgTemperatura1": { "$avg": "$Temperatura"},
        "avghumedad_aire": { "$avg": "$HumedadAire"},
        "avghumedad_tierra": { "$avg": "$HumedadTierra"}
    } 
    }])

    #Recorrido dentro de la base de datos
    for avg in datos:
        promedio1=avg["avgTemperatura1"]
        promedio2=avg["avghumedad_aire"]
        promedio3=avg["avghumedad_tierra"]
    
    
    resultado_envio=Prediccion(promedio1,promedio2,promedio3) #Se envia los promedios como datos de entrada a la funcion Prediccion 
    salida=Productos(resultado_envio)
    #print("Promedio temp: ",promedio1)
    #print("Promedio aire: ",promedio2)
    #print("Promedio tierra: ",promedio3)
    #print()
    print(salida)




