export function formatCPF(cpf: string) {
  if (!cpf) return "";

  // Remove tudo que não é dígito
  cpf = cpf.toString().replace(/\D/g, "");

  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return cpf;
}
