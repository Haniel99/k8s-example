
# Guía Básica de Kubernetes

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Conceptos Básicos](#conceptos-básicos)
   - [Pods](#pods)
   - [Servicios](#servicios)
   - [Tipos de Servicios](#tipos-de-servicios)
   - [Ingress](#ingress)
   - [Volúmenes](#volúmenes)
   - [Namespaces](#namespaces)
3. [Levantar Recursos en Kubernetes](#levantar-recursos-en-kubernetes)
   - [Levantar un Pod](#levantar-un-pod)
     - [Usando kubectl](#usando-kubectl)
     - [Usando un archivo YAML](#usando-un-archivo-yaml)
   - [Levantar un Deployment](#levantar-un-deployment)
   - [Levantar un StatefulSet](#levantar-un-statefulset)
   - [Levantar un DaemonSet](#levantar-un-daemonset)
4. [Redes en Kubernetes](#redes-en-kubernetes)
   - [Comunicación entre Pods](#comunicación-entre-pods)
   - [Servicios de Red](#servicios-de-red)
5. [Recursos Avanzados](#recursos-avanzados)
   - [Probes](#probes)
   - [Recursos y Límites](#recursos-y-límites)

## Introducción

Kubernetes es una plataforma de orquestación de contenedores que automatiza el despliegue, escalado y manejo de aplicaciones contenedorizadas. Esta guía proporciona una introducción a los conceptos básicos y prácticas comunes en Kubernetes.

## Conceptos Básicos

### Pods

Los Pods son la unidad mínima de despliegue en Kubernetes. Un Pod puede contener uno o más contenedores que comparten el mismo contexto de red y almacenamiento.

### Servicios

Los Servicios exponen una aplicación que se ejecuta en un conjunto de Pods como un servicio de red. Proveen una dirección IP y un nombre DNS para acceder a los Pods.

### Tipos de Servicios

Kubernetes ofrece varios tipos de servicios:

- **ClusterIP**: Exponer el servicio en una IP interna del clúster. Este es el tipo por defecto.
- **NodePort**: Exponer el servicio en el mismo puerto en cada nodo, permitiendo el acceso externo.
- **LoadBalancer**: Usar un balanceador de carga externo para exponer el servicio.
- **ExternalName**: Mapear el servicio a un nombre DNS externo.

### Ingress

Un Ingress gestiona el acceso externo a los servicios en un clúster, usualmente HTTP. Proporciona reglas para enrutar el tráfico a los servicios adecuados.

### Volúmenes

Los Volúmenes proporcionan almacenamiento persistente a los Pods. Kubernetes soporta diferentes tipos de volúmenes, como `emptyDir`, `hostPath`, y `persistentVolumeClaim`.

### Namespaces

Los Namespaces proporcionan un mecanismo para dividir los recursos de un clúster en múltiples entornos virtuales, permitiendo aislar aplicaciones entre sí.

## Levantar Recursos en Kubernetes

### Levantar un Pod

### Levantar un Deployment

Los Deployments proporcionan actualizaciones declarativas y escalado para los Pods.

### Levantar un StatefulSet

Los StatefulSets son útiles para aplicaciones que requieren persistencia y un despliegue ordenado.

### Levantar un DaemonSet

Los DaemonSets aseguran que un Pod se ejecute en cada nodo del clúster.

## Redes en Kubernetes

### Comunicación entre Pods

Cada Pod en Kubernetes tiene una dirección IP única dentro del clúster. Los Pods pueden comunicarse entre sí directamente utilizando estas direcciones IP.

### Servicios de Red

Los Servicios proporcionan una manera estable de acceder a los Pods. Existen varios tipos de servicios, como se mencionó anteriormente en la sección [Tipos de Servicios](#tipos-de-servicios).

## Recursos Avanzados

### Probes

Kubernetes puede verificar la salud de los contenedores usando probes:

- **Liveness Probe**: Verifica si el contenedor debe ser reiniciado.
- **Readiness Probe**: Verifica si el contenedor está listo para recibir tráfico.
- **Startup Probe**: Verifica si el contenedor ha iniciado correctamente.

Ejemplo de Liveness Probe:

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 3
  periodSeconds: 3
```

### Recursos y Límites

Puedes especificar las solicitudes y límites de CPU y memoria para los contenedores:

```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "200m"
  limits:
    memory: "256Mi"
    cpu: "500m"
```