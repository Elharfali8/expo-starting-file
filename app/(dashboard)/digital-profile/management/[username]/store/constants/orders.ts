export const orderStatusConfig: any = {
  pending: {
    label: "En attente",
    badge: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-l-yellow-400",
  },

  confirmed: {
    label: "Confirmée",
    badge: "bg-blue-100",
    text: "text-blue-700",
    border: "border-l-blue-700",
  },

  completed: {
    label: "Terminée",
    badge: "bg-green-100",
    text: "text-green-700",
    border: "border-l-green-700",
  },

  cancelled: {
    label: "Annulée",
    badge: "bg-red-100",
    text: "text-red-700",
    border: "border-l-red-700",
  },
};

export const paymentStatusConfig: any = {
  unpaid: {
    label: "Non payé",
    color: "text-red-600",
  },

  paid: {
    label: "Payé",
    color: "text-green-600",
  },

  refunded: {
    label: "Remboursé",
    color: "text-yellow-600",
  },
};

export const fulfillmentStatusConfig: any = {
  unfulfilled: {
    label: "Non préparée",
    color: "text-red-600",
  },

  ready: {
    label: "Prête",
    color: "text-blue-600",
  },

  "out for delivery": {
    label: "En livraison",
    color: "text-yellow-600",
  },

  fulfilled: {
    label: "Livrée",
    color: "text-green-600",
  },
};