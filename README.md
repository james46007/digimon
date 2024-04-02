# teach Stack
Framework Ionic (Angular)

## Set Up Local Workspace

Version node 18.19.1

Si tienes instalado nvm ejecuta (Opcional)
```shell
nvm use
```

Instalar paquetes
```shell
npm i
```

Ejecutar en local
```shell
ionic serve
```

# Construir APK

## Set Up Local Workspace

Version de Java 17 necesario

```shell
ionic build
```

```shell
ionic capacitor add android
```

```shell
ionic capacitor copy android
```

```shell
cd android
```

```shell
./gradlew assembleDebug
```
