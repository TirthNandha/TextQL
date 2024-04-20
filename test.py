from allennlp_models import pretrained

SQL_model_name = "semparse-text-to-sql"
pred_model = pretrained.load_predictor(SQL_model_name)
