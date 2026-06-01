kubernetes/
├── namespace.yaml
├── deployment.yaml
├── service.yaml
├── configmap.yaml
└── README.md

namespace.yaml:

apiVersion: v1
kind: Namespace
metadata:
  name: projeto-docker

deployment.yaml:

apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-web
  namespace: projeto-docker
  labels:
    app: app-web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: app-web
  template:
    metadata:
      labels:
        app: app-web
    spec:
      containers:
        - name: app-web
          image: projeto-docker-app:latest
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: "production"

              service.yaml:

              apiVersion: v1
kind: Service
metadata:
  name: app-web-service
  namespace: projeto-docker
spec:
  type: NodePort
  selector:
    app: app-web
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
      nodePort: 30080

      configmap.yaml:

      apiVersion: v1
kind: ConfigMap
metadata:
  name: app-web-config
  namespace: projeto-docker
data:
  APP_NAME: "Projeto Docker"
  APP_DESCRIPTION: "Aplicação containerizada com estrutura Kubernetes"
  APP_ENVIRONMENT: "production"

  README.md:

  # Estrutura Kubernetes do Projeto

Esta pasta contém uma estrutura básica de Kubernetes para representar como a aplicação poderia ser executada em um ambiente orquestrado.

## Arquivos

### namespace.yaml

Cria um namespace chamado `projeto-docker`, usado para organizar os recursos do Kubernetes.

### deployment.yaml

Define o Deployment da aplicação web.

O Deployment é responsável por:

- Criar os pods da aplicação
- Manter a aplicação em execução
- Reiniciar automaticamente os containers em caso de falha
- Permitir escalabilidade usando réplicas

Neste projeto, foram configuradas 2 réplicas da aplicação.

### service.yaml

Define o Service da aplicação.

O Service é responsável por expor a aplicação para acesso interno ou externo.  
Neste caso, foi utilizado o tipo `NodePort`, permitindo acesso pela porta `30080`.

### configmap.yaml

Define variáveis de configuração da aplicação.

O ConfigMap permite separar configurações do código-fonte, facilitando manutenção e organização da infraestrutura.

## Comandos para aplicar no Kubernetes

```bash
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
